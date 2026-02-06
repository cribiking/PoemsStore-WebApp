import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo({ onSignIn, loading, error }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Mis Poemas</CardTitle>
        <CardDescription>
          Inicia sesión con tu cuenta de Google para guardar tus poemas en todos tus dispositivos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? <p className="text-sm text-red-500 mb-4">{error}</p> : null}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSignIn} 
          disabled={loading}
          className="w-full"
        >
          {loading ? "Conectando..." : "Iniciar sesión con Google"}
        </Button>
      </CardFooter>
    </Card>
  )
}
