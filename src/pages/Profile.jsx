import React, { useEffect, useContext } from 'react';
import context from '../context/AuthContext';
import axios from 'axios';
import { BiSolidUserCircle } from 'react-icons/bi';
import MyBlogs from '../components/MyBlogs';

const Profile = () => {
  const auth = useContext(context);

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const api = await axios.get(`https://web-dev-blog-backend.onrender.com/api/users/myprofile`, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

        console.log(api.data.user); // Check if the user data is correct
        auth.setUser(api.data.user);
        auth.setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, [auth]);

  return (
    <>
      <div 
        className="banner text-center text-white" 
        style={{
          backgroundImage: 'url(/banner2.png)', // Ensure this path is correct
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '50px 0',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // Optional: add a fallback background color to see if the div is rendering
          backgroundColor: '#000',
          paddingBottom: '44px',
           marginBottom:'54px'
        }}
      >
        <h1 style={{ color: 'black' }}>Welcome, {auth.user ? capitalizeFirstLetter(auth.user.name) : 'Loading...'}</h1>
        <br />
        <br />
        <br />
      </div>
      <div className="text-center my-3">
        <MyBlogs />
      </div>
    </>
  );
}

export default Profile;
