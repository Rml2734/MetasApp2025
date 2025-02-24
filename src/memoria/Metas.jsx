import { useReducer } from "react";
import PropTypes from 'prop-types';
import { ContextoMetas, estadoInicial, reductor } from './ContextoMetas';



function MetasMemoria({ children }) {
    const [estado, enviar] = useReducer(reductor, estadoInicial);
    
    return (
        <ContextoMetas.Provider value={[estado, enviar]}>
            {children}
        </ContextoMetas.Provider>
    );
}

MetasMemoria.propTypes = {
    children: PropTypes.node.isRequired
};

export default MetasMemoria;