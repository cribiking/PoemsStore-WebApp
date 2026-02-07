

import { useNavigate } from "react-router-dom"
import { PoemList } from './PoemList';
import { EmptyState } from './EmptyState';



export function DraftsPage({ borradores = [], onEdit }){

    const navigate = useNavigate();

    return(
        <>
        <div className="main-container">
            <div className="content-container">
                <header className="borradores-header header-fixed">
                    <div className="header-left">
                        <h2 className="header-title">Mis Borradores</h2>
                        <p className="header-count">{borradores.length} {borradores.length === 1 ? 'borrador' : 'borradores'}</p>
                    </div>
                    <button type='button' className='return-btn' onClick={() => navigate('/')}>← Back</button>
                </header>
                
                <main>
                    {borradores.length > 0 ? (
                        <PoemList items={borradores} onEdit={onEdit} />
                    ) : (
                        <EmptyState />
                    )}
                </main>
            </div>
        </div>
        </>
    )
}