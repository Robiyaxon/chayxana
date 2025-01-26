import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import Home from './component/home/Home';
import FavooriteFood from './component/favorite/FavooriteFood';
function App() {
  return (
    <BrowserRouter>

   <div className='app'>
    {/* <Home/> */}
    <FavooriteFood/>
   </div>
   </BrowserRouter>
  );
}

export default App;
