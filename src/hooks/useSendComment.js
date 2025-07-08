import { useState } from 'react';
import { sendComment } from '../utils/util.js';
import { inputNotVoid } from '../utils/util.js';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
export const useSendComment = (updateUsers, publications=null, comments =null) => {
  const { usuario } = useContext(AuthContext)
  // Estado de Spinner
  const [showSpinner,setShowSpinner] = useState(false)
  // Estado de texto de alerta
  const [textAlertComment, setTextAlertComment] = useState(``);
  // Estado de alerta
  const [commentSend, setCommentSend] = useState(false);
  // Estado de input
  const [commentText, setCommentText] = useState('');
  // Funcion para actualizar contenido de comentario
  const updateCommentText = (e) => {
    setCommentText(e.target.value);
  };
  // Funcion de comentari
  const handleComment = (idPost) => {
    if (inputNotVoid(commentText)){
      setTextAlertComment('No puede ingresar comentario vacios')
      setCommentSend(true)
      setTimeout(()=>setCommentSend(false),8000)
      return { textAlertComment, commentSend, updateCommentText, setCommentText,handleComment,commentText,showSpinner}
    }
    setTextAlertComment('Comentario enviado')
    setCommentSend(false)
    setShowSpinner(true)
    setTimeout(async () => {
      setShowSpinner(false)
      const newComment = await sendComment(commentText, idPost, usuario.id);
      setCommentSend(true);
      if (newComment) {
        setCommentSend(true);
        if(publications !==null){
          const newPublics = publications.map((p) => {
          if (p.id === idPost) {
            p.comments.push(newComment);
          }
          return p;
        });
          updateUsers(newPublics);
        }else{
          newComment.User = usuario
          const newComments = [... comments, newComment]
          updateUsers(newComments)
        }
        
        setCommentText('');
      } else {
        setTextAlertComment('No se pudo enviar el comentario');
      }
      setTimeout(() => {
        setCommentSend(false);
      }, 8000);
    }, 4000);
  };

  return { textAlertComment, commentSend, updateCommentText, setCommentText,handleComment,commentText,showSpinner}
};
