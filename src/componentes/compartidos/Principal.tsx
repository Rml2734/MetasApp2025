import { ReactNode } from 'react';
import styles from "./Principal.module.css";
import Vinculo from './Vinculo';
import { ReactComponent as ListaSVG } from "./lista.svg";
import { ReactComponent as NuevaSVG } from "./nueva.svg";

interface PrincipalProps {
    children: ReactNode;
  }

function Principal({ children }: PrincipalProps ) {
    return (
        <div className={styles.principal}>
            <aside className={styles.aside}>
                <Vinculo 
                   to="/lista" 
                   texto="Lista de metas" 
                   Icono={ListaSVG}
                />
                <Vinculo 
                    to="/nueva" 
                    texto="Nueva Meta" 
                    Icono={NuevaSVG}
                    />
                       
            </aside>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
  }
  
  export default Principal;
  