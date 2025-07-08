// Importacion de icono
import { MessageCircle } from 'lucide-react';

export function CommentButton({publication, setComment, comment}) {
  console.log(publication,setComment,comment)
  return (
    <div
      onClick={() => setComment(!comment)}
      className='conteiner-comment btn-footer'
      title='Comentar'
    >
      <MessageCircle className='btn-card-feed btn-comment'></MessageCircle>
      <span className='comment-num'>{publication?.comments?.length}</span>
    </div>
  );
}
