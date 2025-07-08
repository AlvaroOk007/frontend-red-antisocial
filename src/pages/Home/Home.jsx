import { CardFeed } from '../../components/Card_feed/CardFeed';
import './Home.css';
import { useGetPublications } from '../../hooks/useGetPublications';
import { CardAside } from '../../components/Card_Aside/CardAside';
import { useGetTenUsers } from '../../hooks/useGetTenUsers';
import { cambiarTitulo } from '../../utils/util';
import { useRedirectLogin } from '../../hooks/useRedirect.jsx';
import { useState, useEffect } from 'react';
function Home() {
  // Redireccion
  useRedirectLogin();

  // Todas las publicaciones
  const { publications } = useGetPublications();

  // Pagina actual
  const [page, setPageNow] = useState(1);

  // Publicaciones a mostrar por pagina
  const postsPerPage = 5;

  // Estados de post
  const [publicationsView, setPublicationView] = useState();

  // Cada vez que cambie `publications` o `page`, actualizamos los visibles
  useEffect(() => {
    if (publications && publications.length > 0) {
      const start = 0;
      const end = page * postsPerPage;
      setPublicationView(publications.slice(start, end));
    }
  }, [publications, page]);
  // Obtengo usuarios
  const { users } = useGetTenUsers();

  // Cambio de titulo de pestaña
  cambiarTitulo('Inicio');

  // Funcion para mostrar mas publicaciones
  const handleLoadMore = () => {
    setPageNow((prev) => prev + 1);
  };
  // Retorno
  return (
    <>
      <main className='container-main-home'>
        {publicationsView ? (
          publicationsView.map((p) => (
            <CardFeed
              publication={p}
              key={p.id}
              updateUsers={setPublicationView}
              publications={publicationsView}
            />
          ))
        ) : publications?.length !== 0 ?
          <span style={{ color: 'white', fontWeight: '600' }}>
            No se pudieron cargar las publicaciones
          </span>:
          <span style={{ color: 'white', fontWeight: '600' }}>
            No hay publicaciones para mostrar
          </span>
        }
        {publicationsView?.length < publications?.length? 
          <button className='btn btn-View-More' onClick={handleLoadMore}>
            Cargar más
          </button>
        : publications?.length !== 0 ?
          <span style={{color: 'white', fontWeight: '500'}}>Es todo por hoy</span> : ''
        }
      </main>
      <aside className='container-aside-home'>
        <h2 className='title-aside'>Sugerencias de perfiles</h2>
        {users ? (
          users.map((u) => <CardAside user={u} key={u.id} />)
        ) : (
          <span style={{ color: 'white', fontWeight: '600' }}>
            No se pudieron cargar los usuarios
          </span>
        )}
      </aside>
    </>
  );
}

export default Home;
