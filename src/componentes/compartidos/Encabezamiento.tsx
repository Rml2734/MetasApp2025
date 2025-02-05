import styles from "./Encabezado.module.css"
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as Perfil } from "./perfil.svg"

function Encabezamiento() {
  return (
      <div className={styles.encabezado}>
        <div className={styles.contenedor}>
          <Logo className={styles.logo}/>
          <a className={styles.titulo} href="/">Metas App</a>
        </div>
        <nav>
          <a href="/perfil" className={styles.vinculo}>
            <Perfil className={styles.icono}/>
          </a>
        </nav>
      </div>
  );
}

export default Encabezamiento;
