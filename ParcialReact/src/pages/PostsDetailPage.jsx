import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../services/posts.service';

const PostsDetailPage = ({ posts = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const postEnMemoria = posts.find((p) => String(p.id) === String(id));

    if (postEnMemoria) {
      setPost(postEnMemoria);
      setLoading(false);
    } else {
      
      getPostById(id)
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Error al cargar el post');
          setLoading(false);
        });
    }
  }, [id, posts]);

  if (loading) {
    return (
      <div className="container-narrow">
        <div className="loading">Cargando detalles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-narrow">
        <div className="empty">{error}</div>
        <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>
        
       
        {post && (
          <button 
            className="back-btn" 
            style={{ border: '1px solid #333', padding: '5px 15px', borderRadius: '6px' }}
            onClick={() => navigate(`/editar/${post.id}`)}
          >
            Editar
          </button>
        )}
      </div>
      
      {post && (
        <div style={{ marginTop: '10px' }}>
          <h2 className="page-title">{post.title}</h2>
          <p style={{ color: 'var(--text-sub)', marginTop: '10px', lineHeight: '1.6' }}>
            {post.body}
          </p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '10px', fontSize: '12px', color: 'gray' }}>
            ID del Post: {post.id} | User ID: {post.userId}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsDetailPage;