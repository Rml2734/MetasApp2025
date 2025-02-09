import styles from "./Vinculo.module.css";
import { ReactNode } from 'react';
import { FunctionComponent, SVGProps } from 'react';
import { Link } from "react-router-dom";

interface VinculoProps {
    Icono: FunctionComponent<SVGProps<SVGSVGElement>>;
    to: string;
    texto: string;
    children?: ReactNode;
  }


function Vinculo({ Icono, texto, to }: VinculoProps) {
    return (
        <Link to={to} className={styles.vinculo}>
          <Icono className={styles.icono} />
          {texto && <span className={styles.texto}>{texto}</span>}
      </Link>
    );
}

export default Vinculo;