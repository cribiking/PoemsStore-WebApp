import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PoemForm } from './PoemForm';
import { ExportMenu } from './ExportMenu';

export function PoemEditor({ poems, onUpdate, onDelete, loading }) {
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

  if (loading) {
    return (
      <div className="poem-form-screen">
        <p>Loading Poem...</p>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="poem-form-screen">
        <p>Poem not found.</p>
        <button type="button" onClick={() => navigate('/')}>Volver</button>
      </div>
    );
  }

  return (
    <div className="poem-form-screen">
      <PoemForm onUpdate={onUpdate} initialPoem={poem} isEditing />
      <div className="poem-editor-actions">
        <button type="button" className="poem-editor-export" onClick={() => setShowExportMenu(true)}>
          📤 Export Poem
        </button>
        <button type="button" className="poem-editor-delete" onClick={() => setShowConfirm(true)}>
          Delete Poem
        </button>
      </div>

      {showExportMenu && (
        <div className="export-modal-overlay" onClick={() => setShowExportMenu(false)}>
          <div className="export-modal-card" onClick={(e) => e.stopPropagation()}>
            <ExportMenu
              poem={poem}
              onClose={() => setShowExportMenu(false)}
            />
          </div>
        </div>
      )}

      {showConfirm ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>Delete poem</h3>
            <p>This action cannot be undone. Do you want to proceed?</p>
            <div className="modal-actions">
              <button type="button" className="modal-btn" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="modal-btn modal-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
