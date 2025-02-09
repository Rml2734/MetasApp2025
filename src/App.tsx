import './App.css';
import Encabezamiento from './componentes/compartidos/Encabezamiento';
import Pie from './componentes/compartidos/Pie';
import Principal from './componentes/compartidos/Principal';
import Lista from './componentes/lista/Lista';



function App() {
  return (
      <div className="App">
       <Encabezamiento></Encabezamiento>
       <Principal>
        <Lista></Lista>
       </Principal>
       <Pie></Pie>
      </div>
  );
}

export default App;
