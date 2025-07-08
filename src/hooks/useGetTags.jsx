import { useState, useEffect } from 'react';

export function useGetTags() {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTags() {
        try {
            const response = await fetch('http://localhost:3001/tags'); // URL del backend para obtener tags
            if (!response.ok) throw new Error('Error al cargar los tags');
            const data = await response.json();
            setTags(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        }

        fetchTags();
    }, []);

    return { tags, loading, error };
}