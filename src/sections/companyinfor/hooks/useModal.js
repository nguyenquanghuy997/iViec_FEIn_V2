import { useState } from 'react';

const useModal = () => {
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (data) => {
    setSelected(data);
    setIsOpen(true);
  };

  const onClose = () => {
    setSelected(null);
    setIsOpen(false);
  };

  return {isOpen, selected, onOpen, onClose};
};

export default useModal;
