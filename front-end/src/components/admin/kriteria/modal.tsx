import { ReactNode } from "react";
import styles from "../../../app/admin/kriteria/kriteriaPage.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button 
          onClick={onClose} 
          className={styles.closeButton}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
