import { useParams } from 'react-router-dom';
import PostDetail from '../../components/Post_detail/PostDetail';
import { useRedirectLogin } from '../../hooks/useRedirect';

export function Post() {
  useRedirectLogin()
  const { id } = useParams();
  return <PostDetail id={id} />;
}
