import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PoemForm } from './PoemForm';
import { ExportMenu } from './ExportMenu';

export function PoemEditor({ poems, onUpdate, onDelete, loading, user }) {
  const { poemId } = useParams();
  const navigate = useNavigate();
  const poem = poems.find((item) => item.id === poemId);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    await onDelete(poemId);
    navigate('/');
  };

  const handleOpenConfirm = () => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  if (loading) {
    return (
      <div className="poem-form-screen">
        <p>Cargando poema...</p>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="poem-form-screen">
        <p>No se encontro el poema.</p>
        <button type="button" onClick={() => navigate('/')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="poem-form-screen">
      <PoemForm onUpdate={onUpdate} initialPoem={poem} isEditing />
      <div className="poem-editor-actions">
        <button type="button" className="poem-editor-export" onClick={() => setShowExportMenu(true)}>
          📤 Exportar
        </button>
        <button type="button" className="poem-editor-delete" onClick={handleOpenConfirm}>
          Eliminar poema
        </button>
      </div>
      {showExportMenu && (
        <div className="export-modal-overlay" onClick={() => setShowExportMenu(false)}>
          <div className="export-modal-card" onClick={(e) => e.stopPropagation()}>
            <ExportMenu 
              poem={poem} 
              user={user}
              onClose={() => setShowExportMenu(false)} 
            />
          </div>
        </div>
      )}
      {showConfirm ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>Eliminar poema</h3>
            <p>Esta accion no se puede deshacer. Deseas continuar?</p>
            <div className="modal-actions">
              <button type="button" className="modal-btn" onClick={handleCloseConfirm}>
                Cancelar
              </button>
              <button type="button" className="modal-btn modal-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
