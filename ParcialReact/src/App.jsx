import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PostsPage from './pages/PostsPage.jsx';
import PostDetailPage from './pages/PostsDetailPage.jsx';
import PostFormPage from './pages/PostsFormPage.jsx';

function App() {
  return (
    <FavoritesProvider> 
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/crear" element={<PostFormPage />} />
            <Route path="/editar/:id" element={<PostFormPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;