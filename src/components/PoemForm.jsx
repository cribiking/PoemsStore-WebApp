// src/components/PoemForm.jsx
import { useState } from 'react';

export function PoemForm({ onAdd , onCanelar}) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  const createNewPoemForm = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!titulo || !texto) return; // No añadir si está vacío

    // Creamos el objeto del nuevo poema
    const nuevoPoema = {
      id: Date.now(), // Un ID único simple
      titulo: titulo,
      contenido: texto,
      fecha: new Date().toLocaleDateString()
    };

    onAdd(nuevoPoema); // Enviamos el poema a App.jsx
    setTitulo(''); // Limpiamos el formulario
    setTexto('');
  };

  return (
    <div className='poem-form-container'>
      <form onSubmit={createNewPoemForm} className="poem-form">
        <input 
          type="text" 
          placeholder="Título del poema..." 
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea 
          placeholder="Escribe aquí tus versos..." 
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Guardar Poema</button>
        <button type="button" onClick={onCanelar}>Guardar en Borradores</button>
      </form>
    </div>
  );
}