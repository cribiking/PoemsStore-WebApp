import { useState } from 'react';
import { PoemList } from './components/PoemList';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { EmptyState } from './components/EmptyState';
import { PoemForm } from './components/PoemForm';

export default function App() {
  const [poemas, setPoemas] = useState([]);
  const [createPoem , setCreatePoem] = useState(false);

  // Paso 3: Función para añadir un poema nuevo
  const agregarPoema = (nuevoPoema) => {
    setPoemas([...poemas, nuevoPoema]); // Copiamos los viejos y añadimos el nuevo
    setCreatePoem(false) //Tanquem el formulari una vegada guardem el Poema
  };


  return (

    <div className="main-container">
      <div className='content-container'>
        <Header count={poemas.length} />

        <FilterBar createPoem={()=> setCreatePoem(true)} />

        <main>
          {createPoem ? (
            <PoemForm 
              onAdd={agregarPoema} 
              onCancelar={() => setCreatePoem(false)} 
            />
          ) : (
            <>
              {poemas.length > 0 ? (
                <PoemList items={poemas} />
              ) : (
                <EmptyState/>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

