import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, createPost, updatePost } from '../services/posts.service';
import PostForm from '../components/PostForm';

const PostsFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getPostById(id).then((d) => {
        setTitle(d.title);
        setBody(d.body);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    setSubmitting(true);
    try {
      if (isEdit) {
        await updatePost(id, { title, body });
        navigate(`/posts/${id}`);
      } else {
        await createPost({ title, body, userId: 1 });
        setSuccess(true);
        setTimeout(() => navigate('/'), 1000);
      }
    } catch {
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
