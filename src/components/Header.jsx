

export function Header({ count, user, onSignOut, onCreatePoem }) {
  const fallbackInitial = (user?.displayName || user?.email || '?').charAt(0).toUpperCase();

  return (
    <header className="header-container header-fixed">
      <div className="header-left">
        <h1 className="header-title">My Poems</h1>
        <p className="header-count"><b>{count} saved poems by Ari</b></p>
      </div>
      <div className="header-user-actions">
        <button type="button" className="header-new-btn" onClick={onCreatePoem} aria-label="Nuevo poema">
          +
        </button>
        <button type="button" className="header-avatar-btn" onClick={onSignOut} title="Salir">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || user.email} className="header-avatar-img" />
          ) : (
            <span className="header-avatar-fallback">{fallbackInitial}</span>
          )}
        </button>
      </div>
    </header>
  );
}
