import { useEffect, useState } from 'react';
import { getRandomInt } from '../utils/images.js';
export const useGetPublications = () => {
  const [publications, setPublications] = useState();
  useEffect(() => {
    const getPostsWithCommentsAndImages = async () => {
      // Obtengo las publicaciones
      const res = await fetch('http://localhost:3001/posts');
      const publications = await res.json();

      // Obtengo los comentarios de cada publicacion
      const publicationsWithComments = await Promise.all(
        publications.map(async (p) => {
          const resComments = await fetch(
            `http://localhost:3001/comments/post/${p.id}`
          );
          const comments = await resComments.json();
          // Coloco likes randoms
          const likes = getRandomInt(10,200)
          return { ...p, comments,likes }; // Agregamos los comentarios al post
        })
      );

      // Obtengo las imagenes de cada publicacion
      const publicationsWithCommentsAndImages = await Promise.all(
        publicationsWithComments.map(async (p)=>{
          const resImages = await fetch(`http://localhost:3001/postimages/post/${p.id}`)
          const images = await resImages.json()
          return { ...p, images }
        })
      )
      
      // Ordenar por fecha de publicación (de más nueva a más vieja)
      publicationsWithCommentsAndImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


      // Actualizo mi estado
      setPublications(publicationsWithCommentsAndImages);
    };

    // Ejecuto la funcion
    getPostsWithCommentsAndImages();
  }, []);
  return { publications, setPublications };
};

