
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';        
import 'primereact/resources/primereact.min.css';               
import 'primeicons/primeicons.css';                             
import 'primeflex/primeflex.css';     
import AppRoutes from "./routes";                         
import Menu from './Components/menuBar';
import { BrowserRouter } from "react-router-dom";
import Dashboard from './Components/dashboard';

function App() {
  return (
    <>

    <BrowserRouter >
      <Menu/>
      <AppRoutes />
    </BrowserRouter>
    </>
  );
}

export default App;
