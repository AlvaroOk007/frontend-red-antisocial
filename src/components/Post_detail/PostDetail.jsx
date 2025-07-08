import './PostDetail.css';
import { useEffect, useState } from 'react';
import { useGetPostDetail } from '../../hooks/useGetPostDetail';
import { CarrouselImages } from '../CarrouselImages/CarrouselImages';
import { CommentInput } from '../CommentInput/CommentInput';
import { LikeButton } from '../ui/LikeButton/LikeButton';
import { cambiarTitulo } from '../../utils/util';
import { CommentButton } from '../ui/CommentButton/CommentButton'
const PostDetail = ({ id }) => {
  const {
    post: fetchedPost,
    comments = [],
    images = [],
    loading,
  } = useGetPostDetail(id);

  const [post, setPost] = useState(null);
  const [localComments, setLocalComments] = useState([]);
  const [commentVisible, setCommentVisible] = useState(false);

  useEffect(() => {
    if (post?.User?.nickName) {
      cambiarTitulo(`Post de ${post.User.nickName}`);
    }
  }, [post]);

  useEffect(() => {
    if (fetchedPost) {
      const likes = fetchedPost.likes ?? Math.floor(Math.random() * 50 + 1);
      setPost({ ...fetchedPost, likes });
      setLocalComments(comments);
    }
  }, [fetchedPost, comments]);

  if (loading) return <p className="post-detail-loading">Cargando publicación...</p>;
  if (!post) return <p className="post-detail-error">No se encontró la publicación.</p>;

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <div className="post-detail-avatar">
          <img
            src="https://s3.ppllstatics.com/lasprovincias/www/pre2017/multimedia/RC/201501/12/media/cortadas/avatar--235x235.jpg"
            alt="avatar"
          />
        </div>
        <div className="post-detail-userinfo">
          <h2>{post.User?.nickName || 'Usuario'}</h2>
          <p>{post.updatedAt?.split('T')[0]}</p>
        </div>
      </div>

      <div className="post-detail-description">
        <p>{post.description}</p>
      </div>

      {images.length > 0 && (
        <div className="post-detail-carousel">
          <CarrouselImages images={images} />
        </div>
      )}

      {/* Botón de Like reutilizable */}
      <div className="post-detail-like-button-wrapper">
        <LikeButton
          publication={post}
          setSinglePublication={setPost}
        />
        <CommentButton 
          publication= {post} setComment ={setCommentVisible} comment = {commentVisible}/>
      </div>
      <div className="post-detail-tags">
          <h3>Etiquetas</h3>
          {post.Tags?.length > 0 ? (
            post.Tags.map(tag => (
              <span key={tag.id} className="badge bg-info text-dark me-1">
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="post-detail-no-tags">Sin etiquetas</span>
          )}
      </div>
      <div className="post-detail-comments">
        <h3>
          Comentarios
          <button 
            onClick={() => setCommentVisible(!commentVisible)}
            className={commentVisible ? `hidden` : ''}
            >
            {'Comentar'}
          </button>
        </h3>
        {localComments.length === 0 ? (
          <p className="post-detail-no-comments">No hay comentarios aún.</p>
        ) : (
          <ul>
            {localComments.map((c) => (
              <li key={c.id} className="post-detail-comment-item">
                <strong>{c.User?.nickName || 'Usuario'}:</strong> {c.content}
              </li>
            ))}
          </ul>
        )}
        <CommentInput
          comment={{ comment: commentVisible, setComment: setCommentVisible }}
          idPost={post.id}
          comments={localComments}
          updateUsers={setLocalComments}
        />
      </div>
    </div>
  );
};

export default PostDetail;
