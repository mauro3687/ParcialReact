import { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../services/posts.service';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  
  const addPost = async (newPost) => {
    try {
      const created = await createPost(newPost);
      setPosts([created, ...posts]); 
    } catch (err) {
      setError(err.message);
    }
  };

  
  const editPost = async (id, updatedData) => {
    try {
      const updated = await updatePost(id, updatedData);
      setPosts(posts.map(post => post.id === id ? updated : post));
    } catch (err) {
      setError(err.message);
    }
  };

 
  const removePost = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { posts, loading, error, addPost, editPost, removePost };
};