import './NewPost.css';
import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useRedirectLogin } from '../../hooks/useRedirect';
import { useGetTags } from '../../hooks/useGetTags';
import { cambiarTitulo } from '../../utils/util';

function NewPost() {
  cambiarTitulo('Postear');
  useRedirectLogin();

  const { usuario } = useContext(AuthContext);
  const [contenido, setContenido] = useState('');
  const [imagenesToPost, setImagenesToPost] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const { tags: allTags, loading, error } = useGetTags();
  const navigate = useNavigate();

  const handleTagChange = (id) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };

  function notifyError() {
    toast.error('Hubo un error en la solicitud');
  }

  function notifyOk() {
    toast.success('Post creado con éxito');
  }

  async function crearPost() {
    try {
      const respuesta = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: contenido,
          userId: usuario.id,
          tagIds: selectedTagIds,
        }),
      });

      if (!respuesta.ok) throw new Error('Error en la solicitud');

      const data = await respuesta.json();

      for (const imagenUrl of imagenesToPost) {
        await fetch('http://localhost:3001/postimages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: imagenUrl,
            postId: data.id,
          }),
        });
      }

      notifyOk();
      setTimeout(() => navigate('../home'), 3000);
    } catch (error) {
      console.log(error);
      notifyError();
    }
  }

  return (
    <div className='new-post-wrapper'>
      <div className='new-post-card'>
        <h3 className='post-title'>Crear nueva publicacion</h3>

        {/* Contenido */}
        <div className='form-section'>
          <label className='form-label'>Contenido</label>
          <textarea
            className='custom-input'
            onChange={(e) => setContenido(e.target.value)}
            required
            placeholder="Escribe algo interesante..."
          />
        </div>

        {/* Imágenes */}
        <div className='form-section'>
          <label className='form-label'>URLs de imágenes</label>
          <textarea
            className='custom-input'
            onChange={(e) =>
              setImagenesToPost(
                e.target.value
                  .split(',')
                  .map((url) => url.trim())
                  .filter((url) => url !== '')
              )
            }
            placeholder="Pega una o más URLs de imágenes (una por línea)"
          />
        </div>

        {/* Etiquetas */}
        <div className='form-section'>
          <label className='form-label'>Etiquetas</label>
          <div className='tags-section'>
            {loading ? (
            <p>Cargando etiquetas...</p>
            ) : error ? (
            <p className='text-danger'>Error al cargar etiquetas</p>
            ) : (
              allTags.map((tag) => (
              <div className='tag-checkbox' key={tag.id}>
                <input
                type='checkbox'
                id={`tag-${tag.id}`}
                value={tag.id}
                checked={selectedTagIds.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
                />
                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
              </div>
            ))
            )}
          </div>
        </div>
        <button className='publish-btn' onClick={crearPost}>
          Publicar
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewPost;
