
export function Header({count}){

    return( 
    <header className="header-container">
      <h1>Mis Poemas</h1>
      <p>{count} poemas guardados</p>
    </header>
     );
}