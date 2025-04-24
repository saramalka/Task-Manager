
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';        
import 'primereact/resources/primereact.min.css';               
import 'primeicons/primeicons.css';                             
import 'primeflex/primeflex.css';     
import AppRoutes from "./routes";                         
import SignUpForm from './Components/register';
import Menu from './Components/menuBar';
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>

    <BrowserRouter>
    <Menu/>
    <AppRoutes />
    
    </BrowserRouter>
    {/* 
    <SignUpForm/> */}
    </>
  );
}

export default App;
