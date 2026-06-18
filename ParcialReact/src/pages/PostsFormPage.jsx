import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, createPost, updatePost } from '../services/posts.service';
import PostForm from '../components/PostForm';


const PostsFormPage = ({ onAgregar, onEditar, posts = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const postEnMemoria = posts.find((p) => String(p.id) === String(id));
      if (postEnMemoria) {
        setTitle(postEnMemoria.title);
        setBody(postEnMemoria.body);
      } else {
        getPostById(id)
          .then((d) => {
            setTitle(d.title);
            setBody(d.body);
          })
          .catch((err) => console.error("Error al cargar post:", err));
      }
    }
  }, [id, isEdit, posts]);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        let postEditado;
        
       
        if (Number(id) > 100) {
          postEditado = { id: Number(id), title, body, userId: 1 };
        } else {
          
          await updatePost(id, { title, body });
          postEditado = { id: Number(id), title, body }; 
        }

        
        if (onEditar) {
          onEditar(postEditado);
        }
        
        navigate(`/posts/${id}`);
      } else {
        const nuevoPost = await createPost({ title, body, userId: 1 });
        if (onAgregar && nuevoPost) {
          onAgregar(nuevoPost);
        }
        setSuccess(true);
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar el post');
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container-narrow">
        <div className="success">
          <div className="check">✓</div>
          <span style={{ color: 'var(--text-sub)', fontSize: 13 }}>Post creado</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-narrow">
      <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>
      <h2 className="page-title">{isEdit ? 'Editar post' : 'Nuevo post'}</h2>
      <PostForm
        title={title}
        body={body}
        setTitle={setTitle}
        setBody={setBody}
        onSubmit={handleSubmit}
        submitting={submitting}
        isEdit={isEdit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default PostsFormPage;