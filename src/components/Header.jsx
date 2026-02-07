
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { CloseSesion } from './CloseSesion'




export function Header({ count, user, onSignOut, onCreatePoem, onExportPoems }) {
  
  //avatar de respaldo, agafa la primera llegra del nom o gmail y la fa majuscula
  const fallbackInitial = (user?.displayName || user?.email || '?').charAt(0).toUpperCase();


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
        <div className='close-sesion-dropdown'>
        <CloseSesion 
          urlIcon={user?.photoURL}
          fallbackInitial={fallbackInitial}
          CloseSesionAlert={onSignOut}
           />
        </div>
      </div>

    </header>
  );
}
