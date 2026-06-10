import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PostsPage from './pages/PostsPage.jsx';
import PostDetailPage from './pages/PostsDetailPage.jsx';
import PostFormPage from './pages/PostsFormPage.jsx';

function App() {
  return (
    <>
      
      <Navbar />
      
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/crear" element={<PostFormPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;