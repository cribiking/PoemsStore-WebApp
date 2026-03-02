// src/components/PoemForm.jsx
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'quill/dist/quill.snow.css';
import { isEditorContentEmpty, toEditorHtml } from '../utils/poemContent';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ]
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'blockquote',
  'list'
];


export function PoemForm({ onAdd, onUpdate, initialPoem, isEditing = false }) {
  const [titulo, setTitulo] = useState(initialPoem?.titulo ?? '');
  const [texto, setTexto] = useState(toEditorHtml(initialPoem?.contenido ?? ''));
  const [titleRequiredError, setTitleRequiredError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // 'cancel' o 'delete'
  const [quillFailed, setQuillFailed] = useState(false);
  const quillContainerRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const isSyncingRef = useRef(false);
  const initialContentRef = useRef(toEditorHtml(initialPoem?.contenido ?? ''));
  const navigate = useNavigate();

  useEffect(() => {
    let disposed = false;
    let quill = null;
    let handleTextChange = null;

    const mountQuill = async () => {
      try {
        const { default: Quill } = await import('quill');
        if (disposed || !quillContainerRef.current) return;

        quill = new Quill(quillContainerRef.current, {
          theme: 'snow',
          modules: quillModules,
          formats: quillFormats,
          placeholder: 'Let your mind be free...'
        });

        quillInstanceRef.current = quill;
        quill.root.innerHTML = initialContentRef.current;

        handleTextChange = () => {
          if (isSyncingRef.current) return;
          setTexto(quill.root.innerHTML);
        };

        quill.on('text-change', handleTextChange);
        setQuillFailed(false);
      } catch {
        setQuillFailed(true);
      }
    };

    mountQuill();

    return () => {
      disposed = true;
      if (quill && handleTextChange) {
        quill.off('text-change', handleTextChange);
      }
      quillInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill) return;

    const currentHtml = quill.root.innerHTML;
    const targetHtml = texto || '<p><br></p>';
    if (currentHtml === targetHtml) return;

    isSyncingRef.current = true;
    quill.root.innerHTML = targetHtml;
    isSyncingRef.current = false;
  }, [texto]);

  const handleFallbackChange = (e) => {
    const plainText = e.target.value;
    if (!plainText.trim()) {
      setTexto('');
      return;
    }

    const escaped = plainText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\n/g, '<br/>');

    setTexto(`<p>${escaped}</p>`);
  };

  const hasChanges = () => {
    if (isEditing) {
      return titulo !== (initialPoem?.titulo ?? '') || 
             texto !== toEditorHtml(initialPoem?.contenido ?? '');
    }
    return titulo.trim() !== '' || !isEditorContentEmpty(texto);
  };

  useEffect(() => {
    if (!initialPoem) return;
    setTitulo(initialPoem.titulo ?? '');
    setTexto(toEditorHtml(initialPoem.contenido ?? ''));
    setTitleRequiredError(false);
  }, [initialPoem]);

  const crearPoema = async (estado) => {
    const missingTitle = !titulo.trim();
    if (missingTitle) {
      setTitleRequiredError(true);
      return;
    }
    if (isEditorContentEmpty(texto) || isSaving) return;
    setTitleRequiredError(false);

    // Para edición, solo actualizar título, contenido y estado (sin cambiar la fecha de creación)
    if (isEditing) {
      const poemActualizado = {
        titulo: titulo,
        contenido: texto,
        estado: estado
      };
      setIsSaving(true);
      try {
        await onUpdate?.(initialPoem?.id, poemActualizado);
        navigate('/');
        setTitulo('');
        setTexto('');
      } finally {
        setIsSaving(false);
      }
    } else {
      // Para nuevo poema, agregar fecha
      const nuevoPoema = {
        titulo: titulo,
        contenido: texto,
        estado: estado
      };
      setIsSaving(true);
      try {
        await onAdd?.(nuevoPoema);
        navigate('/');
        setTitulo('');
        setTexto('');
      } finally {
        setIsSaving(false);
      }
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

  const handleConfirmSaveDraft = () => {
    if (confirmAction === 'cancel') {
      crearPoema('borrador');
    }
  };

  const handleConfirmSaveChanges = () => {
    if (confirmAction === 'cancel') {
      crearPoema('guardado');
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
                className={titleRequiredError ? 'input-title-error' : ''}
                aria-invalid={titleRequiredError}
                onChange={(e) => {
                  const nextTitle = e.target.value;
                  setTitulo(nextTitle);
                  if (titleRequiredError && nextTitle.trim()) {
                    setTitleRequiredError(false);
                  }
                }}
              />
            </div>
            <div className='input-text-container'>
              {quillFailed ? (
                <textarea
                  className='input'
                  placeholder="Let your mind be free..."
                  value={texto.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '')}
                  onChange={handleFallbackChange}
                />
              ) : (
                <div className="poem-quill">
                  <div ref={quillContainerRef} />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {showConfirm ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>Unsaved changes</h3>
            <p>Choose what you want to do with your changes.</p>
            <div className="modal-actions">
              <button type="button" className="modal-btn" onClick={() => {
                setShowConfirm(false);
              }}>
                Cancel
              </button>
              <button type="button" className="modal-btn" onClick={() => {
                setShowConfirm(false);
                handleConfirmSaveDraft();
              }}>
                Save to Drafts
              </button>
              <button type="button" className="modal-btn modal-success" onClick={() => {
                setShowConfirm(false);
                handleConfirmSaveChanges();
              }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}