const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al cargar los posts');
  return await response.json();
};

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Error al cargar el post');
  return await response.json();
};

export const createPost = async (datos) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json(); 
};
export const updatePost = async (id, postData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
  if (!response.ok) throw new Error('Error al actualizar el post');
  return await response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el post');
  return await response.json(); 
};
