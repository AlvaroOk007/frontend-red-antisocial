import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export const useRedirectLogin = () => {
  const navigate = useNavigate();
  const { usuario, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !usuario) {
      navigate('/login');
    }
  }, [loading,usuario, navigate]);
};

export const useRedirectHome = () => {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario) {
      navigate('/home');
    }
  }, [usuario, navigate]);
};