import { useState, useEffect } from 'react';

export const useGetUserById = (id) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [id]);

  return user;
};