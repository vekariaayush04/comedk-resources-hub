import { Route, Routes } from "react-router-dom";
import "./App.css";
import { About, Home, Login, Register } from "./components/pages";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;

