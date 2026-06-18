import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PostsPage from './pages/PostsPage.jsx';
import PostDetailPage from './pages/PostsDetailPage.jsx';
import PostFormPage from './pages/PostsFormPage.jsx';
import { usePosts } from './hooks/usePosts.js';

function App() {
  const { posts, setPosts, loading, error, removePost } = usePosts();

  
  const agregarNuevoPost = (nuevoPost) => {
    setPosts([nuevoPost, ...posts]);
  };

 
  const editarPostLocal = (postActualizado) => {
    setPosts(posts.map(p => String(p.id) === String(postActualizado.id) ? postActualizado : p));
  };

  return (
    <FavoritesProvider> 
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route 
              path="/" 
              element={
                <PostsPage 
                  posts={posts || []} 
                  loading={loading} 
                  error={error} 
                  removePost={removePost} 
                />
              } 
            />
            <Route path="/posts/:id" element={<PostDetailPage posts={posts} />} />
            
            <Route 
              path="/crear" 
              element={<PostFormPage onAgregar={agregarNuevoPost} posts={posts} />} 
            />
            
        
            <Route 
              path="/editar/:id" 
              element={<PostFormPage onEditar={editarPostLocal} posts={posts} />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;