import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export function Header({ count, user, onSignOut, onCreatePoem, onExportPoems }) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const fallbackInitial = (user?.displayName || user?.email || '?').charAt(0).toUpperCase();

  const handleLogout = () => {
    setShowLogoutDialog(false);
    onSignOut();
  };

  return (
    <header className="header-container header-fixed">
      <div className="header-left">
        <h1 className="header-title">My Poems</h1>
        <p className="header-count"><b>{count} saved poems by Ari</b></p>
      </div>
      
      <div className="flex-1 flex justify-center gap-2">
        <ButtonGroup>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCreatePoem} 
            aria-label="Nuevo poema"
            className="text-lg font-bold"
          >
            +
          </Button>
          <ButtonGroupSeparator />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onExportPoems} 
            aria-label="Exportar poemas"
            title="Exportar todos los poemas a .txt"
          >
            ↓
          </Button>
        </ButtonGroup>
      </div>

      <div className="header-user-actions">
        <button 
          type="button" 
          className="header-avatar-btn" 
          onClick={() => setShowLogoutDialog(true)}
          title="Cerrar sesión"
        >
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || user.email} className="header-avatar-img" />
          ) : (
            <span className="header-avatar-fallback">{fallbackInitial}</span>
          )}
        </button>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cerrar sesión? Tus poemas guardados se mantendrán en la nube.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Cerrar sesión</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
