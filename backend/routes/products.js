const express = require('express');
const router = express.Router();
const multer = require('multer');
const fetch = require('node-fetch');
const Product = require('../models/Product');
const { averageHashFromBuffer, hammingDistanceHex } = require('../utils/imageHash');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5_000_000 } });

// GET /api/products - return all products
router.get('/', async (req, res) => {
  try {
    const prods = await Product.find({});
    res.json(prods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /api/products/search
 * Accepts multipart file upload (field name `file`) OR form/body param `imageUrl` (x-www-form-urlencoded or json).
 * Returns top results sorted by similarity.
 */
router.post('/search', upload.single('file'), async (req, res) => {
  try {
    let buffer;
    if (req.file) {
      buffer = req.file.buffer;
    } else if (req.body.imageUrl) {
      const resp = await fetch(req.body.imageUrl);
      if (!resp.ok) return res.status(400).json({ error: 'Unable to fetch image URL' });
      buffer = await resp.buffer();
    } else {
      return res.status(400).json({ error: 'Provide file or imageUrl' });
    }

    const qHash = await averageHashFromBuffer(buffer);

    const products = await Product.find({});
    const results = products.map(p => {
      const dist = hammingDistanceHex(qHash, p.hash);
      const similarity = (64 - dist) / 64;
      return {
        id: p._id,
        name: p.name,
        category: p.category,
        imageUrl: p.imageUrl,
        similarity: Number(similarity.toFixed(3)),
        distance: dist
      };
    });

    results.sort((a, b) => b.similarity - a.similarity);
    const limit = parseInt(req.query.limit || '10');
    res.json({ queryHash: qHash, results: results.slice(0, limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
