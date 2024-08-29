import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import context from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BiLogIn, BiSolidUserCircle, BiLogOut } from 'react-icons/bi';

const Navbar = () => {
  const Auth = useContext(context);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.isAuthenticated);

  useEffect(() => {
    setIsAuthenticated(Auth.isAuthenticated);
  }, [Auth.isAuthenticated]);

  const logout = async () => {
    try {
      const api = await axios.get(`https://web-dev-blog-backend.onrender.com/api/users/logout`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      toast.success(api.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      Auth.setIsAuthenticated(false);

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      toast.error('Logout failed', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.error(err);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="navbar" style={{ marginBottom: 0, paddingBottom: 0 }}>
       
        <Link to={'/'} className="left logo1" style={{ color: 'black' , fontsize: '18px'}}>
          <img src="/logo.png" alt="logo" style={{ width: '60px',margin:'10px' }} />
          All Blogs
        </Link>
        <div className="right">
          {!isAuthenticated && (
            <>
              <Link to={'/login'} className="items">Login</Link>
              <Link to={'/register'} className="items">Register</Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to={'/addblog'} className="items">Add Blog</Link>
              <Link to={'/profile'} className="items" ><h3><BiSolidUserCircle /></h3></Link>
              <div onClick={logout} className="items" style={{ cursor: 'pointer' }}><h3><BiLogOut /></h3></div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Navbar;
