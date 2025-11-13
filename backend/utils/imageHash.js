const sharp = require('sharp');

/**
 * Computes 64-bit average hash (aHash) from image buffer and returns hex string (16 hex chars).
 */
async function averageHashFromBuffer(buffer) {
  // Resize to 8x8, grayscale, raw pixels
  const { data } = await sharp(buffer)
    .resize(8, 8, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i];
  const avg = sum / data.length;

  let bits = '';
  for (let i = 0; i < data.length; i++) {
    bits += data[i] > avg ? '1' : '0';
  }

  // Convert binary to hex string (pad to 16 hex chars)
  const hex = BigInt('0b' + bits).toString(16).padStart(16, '0');
  return hex;
}

function hammingDistanceHex(hex1, hex2) {
  const a = BigInt('0x' + hex1);
  const b = BigInt('0x' + hex2);
  let x = a ^ b;
  let count = 0;
  while (x) {
    count += Number(x & 1n);
    x >>= 1n;
  }
  return count;
}

module.exports = { averageHashFromBuffer, hammingDistanceHex };
