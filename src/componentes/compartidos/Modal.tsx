import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode;
  }


function Modal({ children }: ModalProps) {
    return (
        <div className={styles.fixed}>
            <div className={styles.fixed2}>
                { children }
            </div>
        </div>
    );
}

export default Modal;