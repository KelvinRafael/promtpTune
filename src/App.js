import logo from './logo.svg';
import './App.css';
import {BrowserRouter as BR, Route, Routes } from "react-router-dom";
import Home from './pages/home';

function App() {
  return (
    <BR>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BR>
  );
}

export default App;
