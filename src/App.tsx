import './App.css';
import Encabezamiento from './componentes/compartidos/Encabezamiento';
import Pie from './componentes/compartidos/Pie';
import Principal from './componentes/compartidos/Principal';
import Meta from './componentes/lista/Meta';


function App() {
  return (
      <div className="App">
       <Encabezamiento></Encabezamiento>
       <Principal>
        <Meta></Meta>
       </Principal>
       <Pie></Pie>
      </div>
  );
}

export default App;
