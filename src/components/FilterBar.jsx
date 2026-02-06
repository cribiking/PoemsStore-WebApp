

export function FilterBar({ goToDrafts, numSavedPoems, numDraftPoems, showAllPoems }) {
  return (
    <nav className="filter-bar">
      <div className="container-btn">
        <button onClick={showAllPoems}>Todos ({numSavedPoems + numDraftPoems})</button>
        <button>Guardados ({numSavedPoems})</button>
        <button onClick={goToDrafts} className="btn-borradores">Borradores ({numDraftPoems})</button>
      </div>
    </nav>
  );
}

/*onClick , s'hauria de passar una funcio que obris el formulari */