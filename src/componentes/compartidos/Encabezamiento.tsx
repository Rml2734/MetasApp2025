import styles from "./Encabezado.module.css"
import { ReactComponent as LogoSVG } from "./logo.svg";
import { ReactComponent as PerfilSVG } from "./perfil.svg"
import Vinculo from "./Vinculo";

function Encabezamiento() {
  return (
      <header className={styles.encabezado}>
        <div className={styles.contenedor}>
          <LogoSVG className={styles.logo}/>
          <a className={styles.titulo} href="/">Metas App</a>
        </div>
        <nav>
        <Vinculo 
            href="/perfil" 
            Icono={PerfilSVG} 
        />

         
        </nav>
      </header>
  );
}

export default Encabezamiento;
