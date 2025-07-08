import React, { useState, useContext } from 'react';
import { useGetUsers } from '../../hooks/useGetUsers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useRedirectHome } from '../../hooks/useRedirect';
import { cambiarTitulo } from '../../utils/util';
import './Login.css';
function Login() {
  cambiarTitulo('Iniciar sesión');
  useRedirectHome();
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { users } = useGetUsers();
  const { login } = useContext(AuthContext);

  const PASSWORD_PREDETERMINADA = '123456';

  function notifyError() {
    toast.error('Credenciales incorrectas');
  }

  function notifyOk() {
    toast.success('Inicio de sesión exitoso');
  }

  function handleLogin() {
    if (!nickName || !password) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    const userExists = users.find(
      (user) => user.nickName.toLowerCase() === nickName.toLowerCase()
    );

    if (userExists && password === PASSWORD_PREDETERMINADA) {
      notifyOk();
      login(userExists);
      console.log(
        'Login hecho, revisá localStorage:',
        localStorage.getItem('usuario')
      );
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } else {
      notifyError();
    }
  }

  return (
    <main className='conteiner-main-login'>
      <div className='conteiner-message-welcome'>
        <h2 className='title-message-welcome'>¡Hola de nuevo!</h2>
        <p className='text-message-welcome'>Creá tu cuenta</p>
        <Link to={'/register'}>
          <button className='button-message-welcome'>Registrarme</button>
        </Link>
      </div>
      <div className='container-form-custom'>
        <form className='d-flex justify-content-center align-items-center flex-column'>
          <h3 className='mt-4'>Iniciar sesion</h3>
          <div className='p-5'>
            <div data-mdb-input-init className='form-outline mb-4'>
              <input
                placeholder='sol'
                type='text'
                id='nickName'
                className='form-control message-wel-input'
                required
                onChange={(e) => setNickName(e.target.value)}
              />
              <label className='form-label label-login' htmlFor='nickName'>
                Nombre de usuario
              </label>
            </div>

            <div data-mdb-input-init className='form-outline mb-4'>
              <input
                placeholder='123456'
                type='password'
                id='contraseña'
                className='form-control message-wel-input'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className='form-label label-login' htmlFor='contraseña'>
                Contraseña
              </label>
            </div>

            <div >
              <button
                data-mdb-ripple-init
                type='button'
                className='btn btn-custom btn-block mb-4 w-100 w-md-50'
                onClick={() => handleLogin()}
              >
                Iniciar sesión
              </button>
            </div>

            <div className='text-center'>
              <p style={{textDecoration: 'underline',cursor:'pointer'}}>¿Olvidaste tu contraseña?</p>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </main>
  );
}

export default Login;
