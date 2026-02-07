/*Serveix per quan no hi ha cap poema, servira per la primera vegada que obri la app */
export function EmptyState() {
  return (
    <div className="empty-container">
      <h2>Start Creating your first Poem</h2>
      <p>Created by Arnau C. dedicated to Ariadna I.</p>
    </div>
  );
}