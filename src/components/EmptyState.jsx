/*Serveix per quan no hi ha cap poema, servira per la primera vegada que obri la app */
export function EmptyState() {
  return (
    <div className="empty-container">
      <h3>No tienes poemas aún</h3>
      <p>Comienza creando tu primer poema</p>
    </div>
  );
}