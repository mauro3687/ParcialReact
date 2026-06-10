import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/posts.service';

const PostFormPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPost = await createPost({ title, body, userId: 1 });
      console.log('Post creado:', newPost);
      navigate('/');
    } catch (error) {
      alert('Hubo un error al crear el post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container form-container">
      <h2>Crear Nuevo Post</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input 
            id="title"
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleInputRef}
            required
            placeholder="Escribe el título del post"
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Contenido:</label>
          <textarea 
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows="5"
            placeholder="Escribe el contenido..."
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="btn btn-primary"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Post'}
        </button>
      </form>
    </div>
  );
};

export default PostFormPage;