import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import PropType from "prop-types";

export const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.container}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <p className="text text_type_main-large">{title}</p>
          <CloseIcon onClick={onClose} />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-container")
  );
};

Modal.propTypes = {
  title: PropType.string,
  children: PropType.node,
  onClose: PropType.func.isRequired,
};

export const ModalOverlay = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropType.func.isRequired,
};
