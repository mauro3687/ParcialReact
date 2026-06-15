import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';

const PostsPage = () => {
  const { posts, loading, error, removePost } = usePosts();

  if (loading) return <div className="container">Cargando listado de posts...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <h2>Listado de Posts</h2>
      <div className="card-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 80)}...</p>

            <div className="card-actions">
              <Link to={`/posts/${post.id}`} className="btn btn-primary">
                Ver Detalle
              </Link>
              
              {/* Botón de Editar agregado */}
              <Link 
                to={`/posts/editar/${post.id}`} 
                className="btn" 
                style={{ backgroundColor: '#f0ad4e', color: 'white', marginLeft: '8px', marginRight: '8px', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' }}
              >
                Editar
              </Link>

              <button 
                onClick={() => removePost(post.id)} 
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;