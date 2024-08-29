import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBlog from './pages/AddBlog';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import context from './context/AuthContext';
import BlogDetail from './pages/BlogDetail';
// import UpdateBlog from './pages/UpdateBlog'; 
import UpdateBlog from './components/updateBlog';
import Footer from './components/footer';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addblog' element={<AddBlog />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/details/:id" element={<BlogDetail />} />
        <Route path="/updateblog/:id" element={<UpdateBlog />} /> 
      </Routes>
      <Footer/> 
    </>
  );
}

export default App;
