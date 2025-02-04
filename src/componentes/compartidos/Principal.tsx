import { ReactNode } from 'react';


function Principal({ children }: { children: ReactNode } ) {
    return (
        <div>
            <aside>
                <a href="/lista">Lista</a>
                <a href="/crear">Crear</a>
            </aside>
            <main>
                {children}
            </main>
        </div>
    );
  }
  
  export default Principal;
  