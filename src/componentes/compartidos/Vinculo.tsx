import styles from "./Vinculo.module.css";
import { ReactNode } from 'react';

interface VinculoProps {
    Icono: any;
    href: string;
    texto: string;
    children?: ReactNode;
  }


function Vinculo({ Icono, texto, href }: VinculoProps) {
    return (
        <a href={href} className={styles.vinculo}>
           <Icono className={styles.icono} />
           {texto && <span className={styles.texto}>{texto}</span>}
      </a>
    );
}

export default Vinculo;