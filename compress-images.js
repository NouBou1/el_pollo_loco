const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getImages(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) results.push(...getImages(full));
    else if (/\.(png|jpg|jpeg)$/i.test(f.name)) results.push(full);
  }
  return results;
}

async function compress() {
  const images = getImages('./assets/img');
  for (const img of images) {
    const ext = path.extname(img).toLowerCase();
    const tmp = img + '.tmp';
    await sharp(img)
      [ext === '.png' ? 'png' : 'jpeg']({ quality: 80 })
      .toFile(tmp);
    fs.renameSync(tmp, img);
    console.log('✓', img);
  }
  console.log(`Done: ${images.length} images`);
}

compress();
 