import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './ModalConfirmed.css';
export function ModalCofirmed({ show, setShow }) {
  const { logout } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const handleLogout = () => {
    logout();
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        className='container-modal-custom'
      >
        <Modal.Header closeButton>
          <Modal.Title>¿Seguro que quieres cerrar sesión?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='secondary' onClick={handleLogout}>
            Cerrar Sesion
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
