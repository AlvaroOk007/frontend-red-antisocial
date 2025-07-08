import { useEffect, useState } from 'react';
export const useGetPublications = () => {
  const [publications, setPublications] = useState();
  useEffect(() => {
    const getPostsWithCommentsAndImages = async () => {
      // Obtengo las publicaciones
      const res = await fetch('http://localhost:3000/posts');
      const publications = await res.json();

      // Obtengo los usuarios de cada publicacion
      const publicationWithUsers = publications.map(async (p) => {
        const res = await fetch(`http://localhost:3000/users/${p.UserId}`);
        const data = await res.json();
        p.user = data;
        return p;
      });

      // Resuelvo la promesa

      Promise.all(publicationWithUsers)
        .then((users) => {
          // Ordenar por fecha de publicación (de más nueva a más vieja)
          users.sort(
            (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
          );
          setPublications(users);
        })
        .catch((err) => {
          console.error('Error obteniendo usuarios:', err);
        });
    };

    // Ejecuto la funcion
    getPostsWithCommentsAndImages();
  }, []);
  return { publications, setPublications };
};
