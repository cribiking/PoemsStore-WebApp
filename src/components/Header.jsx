
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { CloseSesion } from './CloseSesion'
import saveIcon from '@/assets/letter.png'
import newIcon from '@/assets/pencil.png'




export function Header({ count, user, onSignOut, onCreatePoem, onExportPoems }) {
  
  //avatar de respaldo, agafa la primera llegra del nom o gmail y la fa majuscula
  const fallbackInitial = (user?.displayName || user?.email || '?').charAt(0).toUpperCase();

  // Obtener solo el primer nombre
  const getFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header className="header-container header-fixed">
      <div className="header-left">
        <h1 className="header-title">My Poems</h1>
        <p className="header-count"><b>{count} saved poems by {getFirstName()} </b></p>
      </div>
      <div className="header-center">
        <ButtonGroup>
          <Button variant="outline" onClick={onCreatePoem} aria-label="Create Poem" className="gap-button-group-left"
          > <img src={newIcon} alt="Create" style={{width: '25px', height: '25px'}} /> </Button>
          <ButtonGroupSeparator/>
          <Button variant="outline" onClick={onExportPoems} aria-label="Download Poems" className="gap-button-group-right"
          > <img src={saveIcon} alt="Download" style={{width: '23px', height: '23px'}} /> </Button>
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
