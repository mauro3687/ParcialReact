import { useState } from 'react';
import PostsCard from '../components/PostsCard';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const PostsPage = ({ posts, loading, error, removePost }) => {
  const [search, setSearch] = useState('');
  const [pending, setPending] = useState(null);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    String(p.id).includes(search.trim())
  );

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner" />
          <span style={{ fontSize: 13 }}>Cargando posts…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container"><div className="empty">Error: {error}</div></div>;
  }

  const confirmDelete = async () => {
    await removePost(pending);
    setPending(null);
  };

  return (
    <div className="container">
      <div className="page-head">
        <h1>Posts</h1>
        <span className="count">{filtered.length} resultados</span>
      </div>
      <div className="search-wrap">
        <input
          placeholder="Buscar…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="cards-grid">
        {filtered.length === 0 ? (
          <div className="empty" style={{ gridColumn: '1 / -1' }}>
            {search ? `Sin resultados para "${search}"` : 'No hay posts.'}
          </div>
        ) : (
          filtered.map((p, i) => (
            <PostsCard key={p.id} post={p} index={i} onDelete={setPending} />
          ))
        )}
      </div>
      {pending && (
        <ConfirmDeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setPending(null)}
        />
      )}
    </div>
  );
};

export default PostsPage;