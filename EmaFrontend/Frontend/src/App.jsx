import "./App.css";
import Routing from "./Components/Routing/Router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="main-container">
      <ToastContainer />
      <Routing />
    </div>
  );
}

export default App;
