import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostFormPage = () => {
  const { id } = useParams(); // Captura el id de la URL si existe
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // Si hay ID, estamos editando

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Si estamos en modo edición, buscamos el post en la API de JSONPlaceholder para rellenar el formulario
  useEffect(() => {
    if (isEditMode) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('No se pudo encontrar el post');
          return res.json();
        })
        .then((data) => {
          setTitle(data.title);
          setBody(data.body);
        })
        .catch((err) => {
          alert('Error al cargar el post para editar');
          navigate('/');
        });
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = isEditMode 
      ? `https://jsonplaceholder.typicode.com/posts/${id}` 
      : 'https://jsonplaceholder.typicode.com/posts';
    
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          title,
          body,
          userId: 1,
          ...(isEditMode && { id: parseInt(id) })
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const data = await response.json();
      
      if (isEditMode) {
        console.log('Post actualizado simulado en API:', data);
        alert('¡Post editado con éxito! (Simulado en API)');
      } else {
        console.log('Post creado simulado en API:', data);
        alert('¡Post creado con éxito!');
      }
      
      navigate('/');
    } catch (error) {
      alert('Hubo un error al procesar el post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container form-container">
      <h2>{isEditMode ? 'Editar Post' : 'Crear Nuevo Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar Post' : 'Guardar Post'}
        </button>
      </form>
    </div>
  );
};

export default PostFormPage;