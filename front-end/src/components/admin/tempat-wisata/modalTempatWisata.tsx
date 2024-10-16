// src/components/admin/tempat-wisata/modalTempatWisata.tsx

import { ReactNode } from "react";
import styles from "../../../app/admin/tempat-wisata/tempatWisataPage.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalTempatWisata = ({ children, onClose }: ModalProps) => {
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

export default ModalTempatWisata;
