// src/components/PoemForm.jsx
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function PoemForm({ onAdd, onUpdate, initialPoem, isEditing = false }) {
  const [titulo, setTitulo] = useState(initialPoem?.titulo ?? '');
  const [texto, setTexto] = useState(initialPoem?.contenido ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // 'cancel' o 'delete'
  const navigate = useNavigate();

  const hasChanges = () => {
    if (isEditing) {
      return titulo !== (initialPoem?.titulo ?? '') || 
             texto !== (initialPoem?.contenido ?? '');
    }
    return titulo.trim() !== '' || texto.trim() !== '';
  };

  useEffect(() => {
    if (!initialPoem) return;
    setTitulo(initialPoem.titulo ?? '');
    setTexto(initialPoem.contenido ?? '');
  }, [initialPoem]);

  const crearPoema = async (estado) => {
    if (!titulo || !texto || isSaving) return;

    const nuevoPoema = {
      titulo: titulo,
      contenido: texto,
      fecha: new Date().toLocaleDateString(),
      estado: estado
    };
    setIsSaving(true);

    try {
      if (isEditing) {
        await onUpdate?.(initialPoem?.id, nuevoPoema);
      } else {
        await onAdd?.(nuevoPoema);
      }
      navigate('/');
      setTitulo('');
      setTexto('');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    if (hasChanges()) {
      setConfirmAction('cancel');
      setShowConfirm(true);
    } else {
      navigate('/');
    }
  };

  const handleConfirmCancel = () => {
    if (confirmAction === 'cancel') {
      // Auto-guardar a Drafts
      crearPoema('borrador');
    }
  };

  const createNewPoemForm = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    crearPoema('guardado'); // Guardar como guardado
  };

  return (
    <>
      <header className='poem-form-header'>
        <h1>{isEditing ? 'Edit Poem' : 'Create Poem'}</h1>
        <div className='header-btn'>
          <Button variant="ghost" onClick={handleCancelClick}>← Back</Button>
        </div>
      </header>

      <div className='header-actions'>
        <ButtonGroup>
          <Button 
            type="submit" 
            form="poem-form" 
            disabled={isSaving}
          >
            Save Poem
          </Button>
          <ButtonGroupSeparator />
          <Button 
            variant="outline"
            onClick={() => crearPoema('borrador')} 
            disabled={isSaving}
          >
            Save to Drafts
          </Button>
          <ButtonGroupSeparator />
          <Button 
            variant="outline"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
      <div className='poem-form-body'>
        <div className='poem-form-container'>
          <form id="poem-form" onSubmit={createNewPoemForm} className="poem-form">
            <div className='title-text-container'>
              <input 
                type="text" 
                placeholder="Write a title..." 
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className='input-text-container'>
              <textarea 
                className='input'
                placeholder="Let your mind be free..." 
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      {showConfirm ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>{confirmAction === 'cancel' ? 'Unsaved changes' : 'Delete poem'}</h3>
            <p>
              {confirmAction === 'cancel' 
                ? 'Do you want to save the changes to Drafts before leaving?' 
                : 'This poem will be deleted. Are you sure?'}
            </p>
            <div className="modal-actions">
              <button type="button" className="modal-btn" onClick={() => {
                setShowConfirm(false);
                navigate('/');
              }}>
                {confirmAction === 'cancel' ? "Don't save" : 'Cancel'}
              </button>
              <button type="button" className="modal-btn modal-danger" onClick={() => {
                setShowConfirm(false);
                handleConfirmCancel();
              }}>
                {confirmAction === 'cancel' ? 'Save to Drafts' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}