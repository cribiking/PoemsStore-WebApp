import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportPoemToPDF(title, content) {
  try {
    // Create a temporary container
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: -9999px;
      padding: 40px;
      background: white;
      color: black;
      width: 210mm;
      max-width: 100%;
      font-family: 'Segoe UI', Tahoma, sans-serif;
    `;
    
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    titleElement.style.cssText = `
      font-size: 24px;
      margin-bottom: 20px;
      font-weight: 600;
    `;
    
    const contentElement = document.createElement('div');
    contentElement.textContent = content;
    contentElement.style.cssText = `
      font-size: 14px;
      line-height: 1.8;
      white-space: pre-wrap;
      word-wrap: break-word;
    `;
    
    container.appendChild(titleElement);
    container.appendChild(contentElement);
    document.body.appendChild(container);
    
    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    // Remove temporary container
    document.body.removeChild(container);
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210 - 40; // A4 width minus margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 20; // Top margin
    
    // Add image to PDF with pagination
    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
    heightLeft -= 277; // A4 height minus margins
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
      heightLeft -= 277;
    }
    
    // Download PDF
    const safeName = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pdf.save(`${safeName || 'poema'}.pdf`);
    
    return { success: true, message: 'PDF descargado correctamente' };
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return { success: false, message: 'Error al descargar el PDF' };
  }
}
