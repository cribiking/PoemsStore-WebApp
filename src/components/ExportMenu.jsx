import { useState } from 'react';
import { exportPoemToPDF } from '../utils/exportPDF';
import { savePoemToGoogleDrive, getGoogleAccessToken } from '../utils/googleDrive';

export function ExportMenu({ poem, user, onClose }) {
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');

  const handleExportPDF = async () => {
    setExporting(true);
    setMessage('Generando PDF...');
    const result = await exportPoemToPDF(poem.titulo, poem.contenido);
    setMessage(result.message);
    setExporting(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleExportTXT = async () => {
    setExporting(true);
    setMessage('Descargando texto...');
    
    try {
      const content = `${poem.titulo}\n${"=".repeat(poem.titulo.length)}\n\n${poem.contenido}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(poem.titulo || 'poema').replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setMessage('Archivo de texto descargado');
    } catch (error) {
      setMessage('Error al descargar el archivo');
      console.error('Download error:', error);
    }
    
    setExporting(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSaveToGoogleDrive = async () => {
    if (!user) {
      setMessage('Error: Usuario no autenticado');
      return;
    }

    setExporting(true);
    setMessage('Guardando en Google Drive...');

    try {
      const tokenResult = await getGoogleAccessToken(user);
      if (!tokenResult.success) {
        setMessage('Error: No se pudo obtener acceso a Google Drive. Asegúrate de haber iniciado sesión con Google.');
        setExporting(false);
        return;
      }

      const result = await savePoemToGoogleDrive(
        poem.titulo,
        poem.contenido,
        tokenResult.token
      );
      setMessage(result.message);
    } catch (error) {
      setMessage('Error al guardar: ' + error.message);
    }

    setExporting(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="export-menu">
      <div className="export-menu-header">
        <h3>Exportar "{poem.titulo}"</h3>
        <button 
          type="button" 
          className="export-close-btn"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="export-menu-buttons">
        <button
          type="button"
          className="export-button pdf-button"
          onClick={handleExportPDF}
          disabled={exporting}
        >
          <span className="export-icon">📄</span>
          <span>Descargar PDF</span>
        </button>

        <button
          type="button"
          className="export-button txt-button"
          onClick={handleExportTXT}
          disabled={exporting}
        >
          <span className="export-icon">📝</span>
          <span>Descargar como Texto</span>
        </button>

        <button
          type="button"
          className="export-button drive-button"
          onClick={handleSaveToGoogleDrive}
          disabled={exporting}
        >
          <span className="export-icon">☁️</span>
          <span>Guardar en Google Drive</span>
        </button>
      </div>

      {message && (
        <div className={`export-message ${exporting ? 'loading' : message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
