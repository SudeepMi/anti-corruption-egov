import './App.css';
import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import User from './utils/User';
import Dashboard from './Pages/Dashboard';
import Marketplace from './Pages/Marketplace';
import About from './Pages/About';

const Ecommerce = React.lazy(() => import('./Pages/Ecommerce'));
const News = React.lazy(() => import("./Pages/News"))

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  if (!User()) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/ecommerce" element={<Ecommerce />} />
            <Route exact path='/news' element={<News />} />
            <Route exact path='/marketplace' element={<Marketplace />} />
            <Route exact path='/about' element={<About />} />u
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
