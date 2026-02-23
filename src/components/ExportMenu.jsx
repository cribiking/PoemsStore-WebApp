import { useState } from 'react';
import { htmlToPlainText } from '../utils/poemContent';

export function ExportMenu({ poem, onClose }) {
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState('');
  const plainContent = htmlToPlainText(poem.contenido);

  const handleExportTXT = async () => {
    setExporting(true);
    setMessage('Descargando texto...');
    
    try {
      const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
      const content = [
        poem.titulo,
        '='.repeat(poem.titulo.length),
        '',
        `Exportado: ${fecha}`,
        '',
        plainContent
      ].join('\r\n');

      const blob = new Blob(['\uFEFF', content], { type: 'text/plain;charset=utf-8' });
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
          className="export-button txt-button"
          onClick={handleExportTXT}
          disabled={exporting}
        >
          <span className="export-icon">📝</span>
          <span>Descargar como Texto</span>
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
