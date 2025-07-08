import { useState, useEffect } from 'react';

export const useGetPostDetail = (id) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const resPost = await fetch(`http://localhost:3001/posts/${id}`);
        const postData = await resPost.json();

        const resComments = await fetch(`http://localhost:3001/comments/post/${id}`);
        const commentsData = await resComments.json();

        postData.comments = commentsData
        const resImages = await fetch(`http://localhost:3001/postimages/post/${id}`);
        const imagesData = await resImages.json();

        setPost(postData);
        setComments(commentsData);
        setImages(imagesData);
      } catch (error) {
        console.error('Error cargando el detalle del post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  return { post, comments, images, loading };
};