import React, { useState } from 'react';
import FormModal from './FormModal';

const ButtonComponent = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Update</button>
      <FormModal isOpen={isModalOpen} id="props.id" onClose={closeModal} />
    </>
  );
};

export default ButtonComponent;