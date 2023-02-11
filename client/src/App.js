import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import SignUp from './page/SignUp';
import { AuthContext } from './context/auth';

function App() {
const { user } = useContext(AuthContext);
  return (
    <div className='app-container '>
      <BrowserRouter>
          <Routes>
            <Route path ='/' element={user ? <Home /> : <Navigate to="/login" />}/>
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />}/>
            <Route path='/signup' element={!user ? <SignUp /> : <Navigate to="/" />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
