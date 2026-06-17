import { useRef, useEffect } from 'react';

const PostForm = ({ title, body, setTitle, setBody, onSubmit, submitting, isEdit, onCancel }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div className="form-col">
      <div className="field">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          ref={titleRef}
          type="text"
          placeholder="Título del post…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="body">Contenido</label>
        <textarea
          id="body"
          rows={9}
          placeholder="Contenido…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="form-actions">
        {isEdit && (
          <button className="btn-line" onClick={onCancel}>Cancelar</button>
        )}
        <button
          className="btn-solid"
          disabled={submitting || !title.trim() || !body.trim()}
          onClick={onSubmit}
        >
          {isEdit ? 'Guardar' : 'Guardar post'}
        </button>
      </div>
    </div>
  );
};

export default PostForm;
