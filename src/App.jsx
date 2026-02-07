import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import { auth, db, googleProvider } from './firebase';
import { PoemList } from './components/PoemList';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { EmptyState } from './components/EmptyState';
import { LoginForm } from './components/LoginForm';

// Lazy load components that aren't needed immediately
const PoemForm = lazy(() => import('./components/PoemForm').then(m => ({ default: m.PoemForm })));
const PoemEditor = lazy(() => import('./components/PoemEditor').then(m => ({ default: m.PoemEditor })));
const Gallery = lazy(() => import('./components/Gallery').then(m => ({ default: m.Gallery })));

export default function App() {
  //Variable on guardem els poemas de moment
  const [poemas, setPoemas] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [poemsLoading, setPoemsLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeView, setActiveView] = useState('saved');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setPoemas([]);
      setPoemsLoading(false);
      return;
    }

    setPoemsLoading(true);
    const poemsRef = collection(db, 'users', user.uid, 'poems');
    const poemsQuery = query(poemsRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      poemsQuery,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPoemas(data);
        setPoemsLoading(false);
      },
      () => {
        setAuthError('No se pudo cargar los poemas.');
        setPoemsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleSignIn = async () => {
    setAuthError('');
    setSignInLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setAuthLoading(false);
      
      // Guardar info del usuario en Firestore
      const userRef = doc(db, 'users', result.user.uid);
      await setDoc(userRef, {
        email: result.user.email,
        displayName: result.user.displayName || result.user.email.split('@')[0],
        photoURL: result.user.photoURL || null,
        createdAt: serverTimestamp()
      }, { merge: true }); // merge: true para no sobrescribir si ya existe
    } catch {
      setAuthError('No se pudo iniciar sesion con Google.');
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthError('');
    try {
      await signOut(auth);
      setUser(null);
    } catch {
      setAuthError('No se pudo cerrar la sesion.');
    }
  };

  // Paso 3: Función para añadir un poema nuevo
  const agregarPoema = async (nuevoPoema) => {
    if (!user) return;
    const poemsRef = collection(db, 'users', user.uid, 'poems');
    await addDoc(poemsRef, {
      ...nuevoPoema,
      createdAt: serverTimestamp()
    });
  };

  const actualizarPoema = async (poemId, nuevoPoema) => {
    if (!user || !poemId) return;
    const poemRef = doc(db, 'users', user.uid, 'poems', poemId);
    await updateDoc(poemRef, {
      ...nuevoPoema,
      fecha: new Date().toLocaleDateString(),
      updatedAt: serverTimestamp()
    });
  };

  const eliminarPoema = async (poemId) => {
    if (!user || !poemId) return;
    const poemRef = doc(db, 'users', user.uid, 'poems', poemId);
    await deleteDoc(poemRef);
  };

  const handleEditPoem = (poemId) => {
    navigate(`/edit/${poemId}`);
  };

  const handleCreatePoem = () => {
    navigate('/new');
  };

  const exportPoemsToTxt = () => {
    if (poemasGuardados.length === 0) {
      alert('No tienes poemas guardados para exportar.');
      return;
    }

    // Formatear poemas en texto
    let content = '═══════════════════════════════════════════\n';
    content += '           MIS POEMAS - COLECCIÓN\n';
    content += '═══════════════════════════════════════════\n\n';
    content += `Autor: ${user?.displayName || user?.email || 'Anónimo'}\n`;
    content += `Fecha de exportación: ${new Date().toLocaleString('es-ES')}\n`;
    content += `Total de poemas: ${poemasGuardados.length}\n\n`;
    content += '═══════════════════════════════════════════\n\n';

    poemasGuardados.forEach((poema, index) => {
      content += `${index + 1}. ${poema.titulo}\n`;
      content += `${'─'.repeat(poema.titulo.length + 3)}\n`;
      content += `Fecha: ${poema.fecha || 'Sin fecha'}\n\n`;
      content += `${poema.contenido}\n\n`;
      content += '═══════════════════════════════════════════\n\n';
    });

    // Crear y descargar archivo
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mis-poemas-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Función para obtener solo poemas guardados
  const poemasGuardados = poemas.filter(p => p.estado === 'guardado');

  // Función para obtener solo borradores
  const borradores = poemas.filter(p => p.estado === 'borrador');


  if (authLoading) {
    return (
      <div className="main-container">
        <div className="content-container">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onSignIn={handleSignIn} loading={signInLoading} error={authError} />;
  }

  return (
    <>
      <Suspense fallback={<div className="main-container"><div className="content-container"><p>Loading...</p></div></div>}>
        <Routes>
        <Route
          path="/"
          element={
            <div className="main-container">
              <Header
                count={poemasGuardados.length + borradores.length}
                user={user}
                onSignOut={handleSignOut}
                onCreatePoem={handleCreatePoem}
                onExportPoems={exportPoemsToTxt}
              />

              <main className='content-container'>
                <div className='poems-section'>
                  <FilterBar 
                    activeView={activeView}
                    onViewChange={setActiveView}
                    goToGallery={() => navigate("/gallery")}
                    numSavedPoems={poemasGuardados.length}
                    numDraftPoems={borradores.length}
                  />

                  {poemsLoading ? (
                    <p>Cargando poemas...</p>
                  ) : activeView === 'saved' ? (
                    poemasGuardados.length > 0 ? (
                      <PoemList items={poemasGuardados} onEdit={handleEditPoem} />
                    ) : (
                      <EmptyState/>
                    )
                  ) : (
                    borradores.length > 0 ? (
                      <PoemList items={borradores} onEdit={handleEditPoem} />
                    ) : (
                      <EmptyState/>
                    )
                  )}
                </div>
              </main>

              <footer className='footer-container'>
                <p> Dedicated to Ariadna I. created by Arnau C.</p>
                <p>My sweet Love</p>
              </footer>
            </div>
          }
        />
        <Route
          path="/new"
          element={
            <div className="poem-form-screen">
              <PoemForm onAdd={agregarPoema} />
            </div>
          }
          
        />
        <Route
          path="/edit/:poemId"
          element={
            <PoemEditor poems={poemas} onUpdate={actualizarPoema} onDelete={eliminarPoema} loading={poemsLoading} user={user} />
          }
        />
        <Route
          path="gallery"
          element={
            <Gallery/>
          }
        />
        </Routes>
      </Suspense>
    </>
  );
}

