import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserSubscription from './components/UserSubscription';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import SnackbarProvider from 'react-simple-snackbar'

function App() {
  return (
    <Router>
    <SnackbarProvider>
      <div className="App">

     <div className="nonav">
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/allsubs" element={<UserSubscription/>}/>
        <Route path="*" component={<Home/>} />
     </Routes>
     </div>
     

     
    </div>
    </SnackbarProvider>
    </Router>
    
  );
}

export default App;
