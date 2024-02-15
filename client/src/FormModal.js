import React from 'react';
import Modal from 'react-modal';
import UpdateFormComponent from './UpdateFormComponent';

Modal.setAppElement('#root');

const FormModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Form Modal</h2>
      <UpdateFormComponent/>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default FormModal;