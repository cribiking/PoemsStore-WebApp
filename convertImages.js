import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const publicDir = './public';
const quality = 80; // Calidad del WebP (0-100)

async function convertImagesToWebP() {
  try {
    const files = await readdir(publicDir);
    
    // Filtrar solo archivos JPG
    const imageFiles = files.filter(file => {
      const ext = extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg';
    });

    console.log(`Encontradas ${imageFiles.length} imágenes para convertir...`);

    for (const file of imageFiles) {
      const inputPath = join(publicDir, file);
      const fileName = basename(file, extname(file));
      const outputPath = join(publicDir, `${fileName}.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality })
          .toFile(outputPath);
        
        console.log(`✓ Convertido: ${file} -> ${fileName}.webp`);
      } catch (err) {
        console.error(`✗ Error convirtiendo ${file}:`, err.message);
      }
    }

    console.log('\n✓ Conversión completada!');
  } catch (err) {
    console.error('Error:', err);
  }
}

convertImagesToWebP();
