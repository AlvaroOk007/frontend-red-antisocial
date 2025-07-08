export const sendComment = async (comentText, idPost, idUser) => {
  try {

    // Realizo la peticon
    const commnetSend = await fetch('http://localhost:3001/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: comentText,
        postId: idPost,
        userId: idUser,
      }),
    });
    
    // Resuelvo la promesa
    const result = await commnetSend.json();

    // Devuelvo el id del comentario
    return result;
  } catch (error) {
    console.log('Error al realizar el comentario', error)
    return false
  }
};


export const inputNotVoid = (input) => {
  return input.replace(/\s+/g, '').length === 0
}

export function cambiarTitulo(tituloNuevo) {
  document.title = `${tituloNuevo} | Red Anti-Social`;
}