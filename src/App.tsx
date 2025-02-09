import './App.css';
import Encabezamiento from './componentes/compartidos/Encabezamiento';
import Pie from './componentes/compartidos/Pie';
import Principal from './componentes/compartidos/Principal';
import Lista from './componentes/lista/Lista';
import Detalles from './componentes/nueva/Detalles';



function App() {
  return (
      <div className="App">
       <Encabezamiento></Encabezamiento>
       <Principal>
        {/*<Lista></Lista> */}
        <Detalles></Detalles>
       </Principal>
       <Pie></Pie>
      </div>
  );
}

export default App;
