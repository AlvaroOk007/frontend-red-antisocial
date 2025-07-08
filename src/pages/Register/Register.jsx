import React, { useState } from 'react';
import { useGetUsers } from '../../hooks/useGetUsers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useRedirectHome } from '../../hooks/useRedirect';
import { cambiarTitulo } from '../../utils/util';
import './Register.css'
function Register() {
  cambiarTitulo('Registrarse');
  useRedirectHome();
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const usuarios = useGetUsers();
  const setUsuario = (e) => {
    setNickName(e);
  };
  const setEmailNuevo = (e) => {
    setEmail(e);
  };

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function notifyError() {
    toast.error('Hubo un error en la solicitud');
  }
  function notifyErrorUser() {
    toast.error('Hubo un error: nickName existente o email erroneo');
  }
  function notifyOk() {
    toast.success('Usuario creado con exito');
  }

  async function crearUsuario(nombre, emailNuevo) {
    if (
      !usuarios.users.map((nombre) => nombre.nickName).includes(nombre) &&
      validarEmail(email)
    ) {
      try {
        let respuesta = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nickName: nombre,
            email: emailNuevo,
          }),
        });
        if (!respuesta.ok) {
          throw new Error('error en la solicitud', respuesta);
        }

        const data = await respuesta.json();
        console.log('usuario creado', data);
        notifyOk();
        setTimeout(() => {
          navigate('../login');
        }, 3000);
        setNickName('');
        setEmail('');
      } catch (error) {
        console.log(error);
        notifyError();
      }
    } else {
      notifyErrorUser();
    }
  }

  return (
    <main className='conteiner-main-login conteiner-main-register'>
      <div className='container-form-custom'>
        <form className='d-flex justify-content-center align-items-center flex-column'>
          <h3 className='mt-4'>Registrate</h3>
          <div className='p-5'>
            <div data-mdb-input-init className='form-outline mb-4'>
              <input
                type='text'
                id='form2Example1'
                className='form-control message-wel-input'
                required
                onChange={(e) => setUsuario(e.target.value)}
              />
              <label className='form-label label-login' htmlFor='form2Example1'>
                Nombre de usuario
              </label>
            </div>

            <div data-mdb-input-init className='form-outline mb-4'>
              <input
                type='email'
                id='form2Example2'
                className='form-control message-wel-input'
                required
                onChange={(e) => setEmailNuevo(e.target.value)}
              />
              <label className='form-label label-login' htmlFor='form2Example2'>
                Email
              </label>
            </div>

            <div>
              <div className='col d-flex justify-content-center w-100'>
                <button
                  data-mdb-ripple-init
                  type='button'
                  className='btn btn-custom btn-block mb-4 w-100 w-md-50'
                  onClick={() => crearUsuario(nickName, email)}
                >
                  Registrarse
                </button>
              </div>
            </div>

          </div>
        </form>
        <ToastContainer />
      </div>
      <div className='conteiner-message-welcome'>
        <h2 className='title-message-welcome'>¡Bienvenido!</h2>
        <p className='text-message-welcome'>¿Ya tenés cuenta?</p>
        <Link to={'/login'}>
          <button className='button-message-welcome'>Iniciar Sesion</button>
        </Link>
      </div>
    </main>
  );
}

export default Register;
