import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

export const Modal = ({ title, children, isOpen, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", onKeyDown, { once: true });
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown, { once: true });
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.container}>
      <div className={styles.overlay} onClick={onClose}></div>
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
