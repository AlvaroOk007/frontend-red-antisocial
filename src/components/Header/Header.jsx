import { UserRound, House, Search, BadgePlus, LogOut } from 'lucide-react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ModalCofirmed } from '../ui/ModalConfirmed/ModalConfirmed';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
export function Header() {
  const { usuario } = useContext(AuthContext)
  const [viewModal, setViewModal] = useState(false);
  return (
    <header className={`conteiner-header ${!usuario ? 'hidden' : ''}`} >
      <div className='conteiner-logo'>
        <div className='conteiner-logo-img'>
          <img src="/logo.png" alt="" style={{width: '40px'}}/>
          <h2 className='container-logo-title'> ℛ𝑒𝒹-𝒜𝓃𝓉𝒾𝒮𝑜𝒸𝒾𝒶𝓁</h2>
        </div>
        <ul className='header-container-navbar'>
          <Link className='header-conteiner-item' to={'/home/'}>
            <House className='header-item-icon' />
            <span className='header-item-text'>Inicio</span>
          </Link>
          <Link className='header-conteiner-item' to={'/search'}>

            <Search className='header-item-icon' />
            <span className='header-item-text'>Buscar</span>
          </Link>
          <li>
            <Link className='header-conteiner-item' to={'/publicar'}>
              <BadgePlus className='header-item-icon' />
              <span className='header-item-text'>Publicar</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='conteiner-user'>
        <ul className='header-container-navbar'>
          <Link className='header-conteiner-item' to={'/user/my-profile'}>
            <UserRound className='header-item-icon' />
            <span className='header-item-text'>Mi Perfil</span>
          </Link>
          <li
            className='header-conteiner-item'
            onClick={() => {
              if(usuario){
              setViewModal(true)}
              }
            }
          >
            <LogOut className='header-item-icon' />
            <span className='header-item-text'>Cerrar Sesión</span>
          </li>
        </ul>
      </div>
      <ModalCofirmed show={viewModal} setShow={setViewModal} />
    </header>
  );
}
