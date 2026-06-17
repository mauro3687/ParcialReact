import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const PostsCard = ({ post, onDelete, index = 0 }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favoriteado = isFavorite(post.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    toggleFavorite(post.id);
  };

  return (
    <div className="card" style={{ animationDelay: `${Math.min(index * 0.03, 0.4)}s` }}>
      <div className="card__top">
        <span className="badge">Post {post.id}</span>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
       
          <button 
            className="x-bare" 
            title={favoriteado ? "Quitar de favoritos" : "Marcar como favorito"}
            onClick={handleFavoriteClick}
            style={{ cursor: 'pointer' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill={favoriteado ? "#f39c12" : "none"} 
              stroke={favoriteado ? "#f39c12" : "currentColor"} 
              strokeWidth="2"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </button>

         
          <button 
            className="x-bare" 
            title="Eliminar" 
            onClick={(e) => {
              e.stopPropagation(); 
              onDelete(post.id);
            }}
          >
            X
          </button>
        </div>
      </div>
      <h3 className="card__title">{post.title}</h3>
      <p className="card__body">{post.body}</p>
      <div className="card__foot">
        <button className="link-detail" onClick={() => navigate(`/posts/${post.id}`)}>
          Ver detalle →
        </button>
      </div>
    </div>
  );
};

export default PostsCard;