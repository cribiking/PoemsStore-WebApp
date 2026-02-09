import sharp from 'sharp';
import { join } from 'path';

const publicDir = './public';
const quality = 80;

// Fotos que necesitan rotación (2, 3, 4)
const imagesToRotate = [
  'paoAndMe.webp',
  'ariVAndMe.webp', 
  'angryAri.webp'
];

async function rotateImages() {
  console.log('Rotando imágenes...\n');

  for (const file of imagesToRotate) {
    const filePath = join(publicDir, file);

    try {
      // Leer la imagen, auto-rotar según EXIF y sobrescribir
      await sharp(filePath)
        .rotate() // Auto-rotación según metadatos EXIF
        .webp({ quality })
        .toFile(filePath + '.tmp');
      
      // Reemplazar el archivo original
      await sharp(filePath + '.tmp')
        .toFile(filePath);
      
      // Limpiar archivo temporal
      const fs = await import('fs/promises');
      await fs.unlink(filePath + '.tmp');
      
      console.log(`✓ Rotado: ${file}`);
    } catch (err) {
      console.error(`✗ Error rotando ${file}:`, err.message);
    }
  }

  console.log('\n✓ Rotación completada!');
}

rotateImages();
