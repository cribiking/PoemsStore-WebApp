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
  const [confirmAction, setConfirmAction] = useState(null); // 'delete' o 'cancel'

  const handleDelete = async () => {
    if (!onDelete) return;
    await onDelete(poemId);
    navigate('/');
  };

  const handleOpenConfirm = (action) => {
    setConfirmAction(action);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
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
        <button type="button" className="poem-editor-delete" onClick={() => handleOpenConfirm('delete')}>
          Delete Poem
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
            <h3>{confirmAction === 'delete' ? 'Delete poem' : 'Unsaved changes'}</h3>
            <p>
              {confirmAction === 'delete' 
                ? 'This action cannot be undone. Do you want to proceed?' 
                : 'Do you want to save the changes to Drafts before leaving?'}
            </p>
            <div className="modal-actions">
              <button type="button" className="modal-btn" onClick={handleCloseConfirm}>
                {confirmAction === 'delete' ? 'Cancel' : "Don't save"}
              </button>
              <button type="button" className="modal-btn modal-danger" onClick={() => {
                handleCloseConfirm();
                if (confirmAction === 'delete') {
                  handleDelete();
                }
              }}>
                {confirmAction === 'delete' ? 'Delete' : 'Save to Drafts'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
