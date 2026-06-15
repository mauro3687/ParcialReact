import { useNavigate } from 'react-router-dom';

const PostsCard = ({ post, onDelete, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ animationDelay: `${Math.min(index * 0.03, 0.4)}s` }}>
      <div className="card__top">
        <span className="badge">Post {post.id}</span>
        <button className="x-bare" title="Eliminar" onClick={() => onDelete(post.id)}>✕</button>
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
