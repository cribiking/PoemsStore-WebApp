export function LoginForm({ onSignIn, loading, error }) {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-mark">+</span>
          <h1>Mis Poemas</h1>
        </div>
        <p className="login-subtitle">
          Inicia sesion con tu cuenta de Google para guardar tus poemas en todos tus dispositivos.
        </p>
        {error ? <p className="login-error">{error}</p> : null}
        <button type="button" className="login-btn" onClick={onSignIn} disabled={loading}>
          <span className="login-btn-icon">G</span>
          {loading ? "Conectando..." : "Iniciar sesion con Google"}
        </button>
      </div>
    </div>
  );
}
