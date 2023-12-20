import { useCallback, useState } from "react";

export function useModal(defaultOpen = false) {
  const [isModalOpen, setIsModalOpen] = useState(defaultOpen);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen(isOpen => !isOpen);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}
