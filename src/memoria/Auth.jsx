import React, { useReducer } from "react";
import PropTypes from 'prop-types';
import { ContextoAuth, estadoInicial, reductor } from './ContextoAuth';

function AuthMemoria({ children }) {
  const [estado, enviar] = useReducer(reductor, estadoInicial);
  
  return (
    <ContextoAuth.Provider value={[estado, enviar]}>
      {children}
    </ContextoAuth.Provider>
  );
}

AuthMemoria.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthMemoria;