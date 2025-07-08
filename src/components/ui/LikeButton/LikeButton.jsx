import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LikeButton({
  publication,
  publications = null,
  updateUsers = null,
  setSinglePublication = null,
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(publication.likes || 0);

  useEffect(() => {
    setLikes(publication.likes || 0);
  }, [publication.likes]);

  const handleLike = () => {
    const change = liked ? -1 : 1;
    setLiked(!liked);
    setLikes((prev) => prev + change);

    if (publications && updateUsers) {
      const updated = publications.map((p) => {
        if (p.id === publication.id) {
          return { ...p, likes: (p.likes || 0) + change };
        }
        return p;
      });
      updateUsers(updated);
    } else if (setSinglePublication) {
      setSinglePublication((prev) => ({
        ...prev,
        likes: (prev.likes || 0) + change,
      }));
    }
  };

  return (
    <div
      title={`${liked ? 'No' : 'Dar'} Me gusta`}
      onClick={handleLike}
      className={`conteiner-heart btn-footer ${liked ? 'liked' : ''}`}
    >
      <Heart
        className="btn-card-feed"
        fill={liked ? 'rgba(255, 4, 4, 0.616)' : 'none'}
        color="red"
      />
      <span className="comment-num">{likes}</span>
    </div>
  );
}
