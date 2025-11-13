// Usage: put images in backend/seed/images named like product1.jpg ... product50.jpg
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { averageHashFromBuffer } = require('../utils/imageHash');

const imagesDir = path.join(__dirname, 'images');

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to mongo');

  const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  let count = 0;

  for (const file of files) {
    try {
      const buf = fs.readFileSync(path.join(imagesDir, file));
      const hash = await averageHashFromBuffer(buf);
      const name = path.parse(file).name;

      const prod = new Product({
        name: name,
        category: 'misc',
        imageUrl: `${process.env.BASE_URL || 'http://localhost:5000'}/seed/images/${file}`,
        hash
      });

      await prod.save();
      count++;
      console.log(`Saved ${file} -> ${hash}`);
    } catch (e) {
      console.error('Error processing', file, e.message);
    }
  }

  console.log(`Seeded ${count} products`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
