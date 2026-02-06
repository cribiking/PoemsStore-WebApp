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
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialPoem) return;
    setTitulo(initialPoem.titulo ?? '');
    setTexto(initialPoem.contenido ?? '');
  }, [initialPoem]);

  const crearPoema = async (estado) => {
    if (!titulo || !texto || isSaving) return; // No añadir si está vacío

    // Creamos el objeto del nuevo poema
    const nuevoPoema = {
      titulo: titulo,
      contenido: texto,
      fecha: new Date().toLocaleDateString(),
      estado: estado // 'guardado' o 'borrador'
    };
    setIsSaving(true);

    try {
      if (isEditing) {
        await onUpdate?.(initialPoem?.id, nuevoPoema);
      } else {
        await onAdd?.(nuevoPoema); // Enviamos el poema a App.jsx
      }
      navigate('/');
      setTitulo(''); // Limpiamos el formulario
      setTexto('');
    } finally {
      setIsSaving(false);
    }
  };

  const createNewPoemForm = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    crearPoema('guardado'); // Guardar como guardado
  };

  return (
    <>
      <header className='poem-form-header'>
        <h2>Escriu el teu Poema</h2>
        <div className='header-btn'>
          <Button variant="ghost" onClick={() => navigate('/')}>← Tornar</Button>
        </div>
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
              Drafts
            </Button>
            <ButtonGroupSeparator />
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      </header>

      <div className='poem-form-body'>
        <div className='poem-form-container'>
          <form id="poem-form" onSubmit={createNewPoemForm} className="poem-form">
            <div className='title-text-container'>
              <input 
                type="text" 
                placeholder="Título del poema..." 
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className='input-text-container'>
              <textarea className='input'
                placeholder="Escribe aquí tus versos..." 
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}