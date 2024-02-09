import { Route, Routes } from "react-router-dom";
import "./App.css";
import { About, Home, Notes ,Login, Register } from "./components/pages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/Notes' element={<Notes/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
    </div>
    </RecoilRoot>
  );
}

export default App;

