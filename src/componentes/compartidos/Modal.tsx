import styles from "./Modal.module.css"


function Modal({ children }) {
    return (
        <div className={styles.fixed}>
            <div className={styles.fixed2}>
                { children }
            </div>
        </div>
    );
}

export default Modal;