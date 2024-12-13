import React from 'react';
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// const Login = lazy(()=> import('./login'));
// const Protected = lazy(()=> import('./protected'));
// const Home = lazy(()=> import('./home'));
// const Dashboard = lazy(()=> import('./dashboard'));
import Login from './login';
import Protected from './protected';
import Home from './home';
import Dashboard from './dashboard';

// import Login from './Login';
// import Protected from './Protected';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;