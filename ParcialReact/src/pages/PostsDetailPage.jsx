import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../services/posts.service';

const PostsDetailPage = () => {
  
  const { id } = useParams();
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

  if (loading) return <div>Cargando detalle del post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No se encontró el post.</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <p style={{ color: '#888' }}>Post ID: {post.id}</p>
      <h2>{post.title}</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{post.body}</p>
      
      <div style={{ marginTop: '30px' }}>
        
        <Link to="/" style={{ 
          padding: '10px 15px', 
          background: '#333', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '4px' 
        }}>
          Volver al listado
        </Link>
      </div>
    </div>
  );
};


export default PostsDetailPage;