import React from "react";
import { Outlet } from 'react-router-dom';
import Encabezamiento from './Encabezamiento';
import Pie from './Pie';
import styles from './Layout.module.css';
import Aside from './Aside';


function Layout({privado = false}) {  // Valor por defecto si no se pasa "privado"
    return (
        <>   
            <Encabezamiento></Encabezamiento>
            <main className={styles.main}>
                {privado && <Aside />}
                <section className={styles.section}>
                    <Outlet></Outlet>
                </section>
            </main>
            <Pie></Pie>  
        </>
    );
}

export default Layout;