import { CardDemo } from "./CardDemo"

export function LoginForm({ onSignIn, loading, error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <CardDemo onSignIn={onSignIn} loading={loading} error={error} />
    </div>
  );
}
