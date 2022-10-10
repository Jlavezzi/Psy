import Register from "./Pages/Register";
import HomePage from "./Pages/Homepage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoutes from "./Authenticator/Auth";
import Navbar from "./Components/Navbar";
import Portfolio from "./Pages/Portfolio";
function App() {
  return (
    <Router>
    <Navbar />
      <Routes>
      
        <Route element = {<PrivateRoutes />}>
        <Route path='/portfolio' element={<Portfolio/>}/>
         <Route path='/' element={<HomePage/>} />
         
        </Route>

        <Route path = '/register' element= {<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
