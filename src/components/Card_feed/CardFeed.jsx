import './CardFeed.css';
import { Link } from 'react-router-dom';
import { CarrouselImages } from '../CarrouselImages/CarrouselImages';
// Importacion de Componentes de Lucide
import { SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import { CommentInput } from '../CommentInput/CommentInput';
import { LikeButton } from '../ui/LikeButton/LikeButton';
import { CommentButton } from '../ui/CommentButton/CommentButton';
export function CardFeed({ publication, updateUsers, publications }) {
  const [comment, setComment] = useState(false)

  return (
    <article className='conteiner-card_feed'>
      <div className='conteiner-card_feed-header'>
        <div className='card_feed-img'>
          <div className='img'>
            <img src='https://s3.ppllstatics.com/lasprovincias/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--235x235.jpg' alt='' />
          </div>
        </div>
        <div className='card_feed-username'>
          <Link to={`/user/${publication.User.id}`}>{publication.User.nickName}</Link>
          <p>{publication.updatedAt.split('T')[0]}</p>
        </div>
      </div>
      <div className='container_decription_card_feed'>
        <div className='card_feed-description'>
          <p className='card_feed-description-text'>{publication.description}</p>
        </div>
        {publication.images.length > 0 && <CarrouselImages images={publication.images} />}
      </div>
      <div className='conteiner-card_feed-footer'>
        <div className='conteiner-card_feed-footer-icons-left'>
          <LikeButton publications={publications} updateUsers={updateUsers} publication={publication} />
          <CommentButton publication= {publication} setComment ={setComment} comment = {comment} />
        </div>
        <div title='Ver Publicacion' className='btn-footer conteiner-btn-publication'>
          <Link to={`/post/${publication.id}`} className='conteiner-btn-publication'>
            <span className='btn-footer-text-view-publication'>Ver Publicacion</span>
            <SquareArrowOutUpRight className='btn-card-feed' />
          </Link>
        </div>
      </div>
      <CommentInput comment={{comment,setComment}} idPost = {publication.id} publications={publications} updateUsers = {updateUsers}/>
    </article>
  );
}
