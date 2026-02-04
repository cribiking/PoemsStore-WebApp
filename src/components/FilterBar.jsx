

export function FilterBar({createPoem}){

   return (
    <nav className="filter-bar">
      <div className="container-btn">
        <button>Todos (0)</button>
        <button>Guardados (0)</button>
        <button>Borradores (0)</button>
      </div>
        <button onClick={createPoem} className="btn-new"> + Nuevo Poema</button>
    </nav>
  );
}

/*onClick , s'hauria de passar una funcio que obris el formulari */