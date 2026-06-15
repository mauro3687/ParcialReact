import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/posts.service';

const PostsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container-detail">
        <div className="loading"><div className="spinner" /></div>
      </div>
    );
  }
  if (error) return <div className="container-detail"><div className="empty">Error: {error}</div></div>;
  if (!post) return <div className="container-detail"><div className="empty">No se encontró el post.</div></div>;

  return (
    <div className="container-detail">
      <button className="back-btn" onClick={() => navigate('/')}>← Volver</button>
      <div style={{ animation: 'fadeUp .25s ease both' }}>
        <div className="detail-head">
          <span className="badge">Post {post.id}</span>
          <button className="link-edit" onClick={() => navigate(`/editar/${post.id}`)}>
            Editar
          </button>
        </div>
        <h2 className="detail-title">{post.title}</h2>
        <p className="detail-body">{post.body}</p>
      </div>
    </div>
  );
};

export default PostsDetailPage;
