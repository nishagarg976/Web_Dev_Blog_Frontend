import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiSolidUserCircle } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { Box, Typography } from '@mui/material';

const UserDetail = ({ id }) => {
  const [user, setUser] = useState({});

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const api = await axios.get(`https://web-dev-blog-backend.onrender.com/api/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setUser(api.data.user);
    };

    fetchUser();
  }, [id]);

  return (
    <Box>
      <Typography variant="h6" display="flex" alignItems="center">
        <BiSolidUserCircle style={{ marginRight: '8px' }} />
        {capitalizeFirstLetter(user.name)}
      </Typography>
      <Typography variant="body2" display="flex" alignItems="center">
        <MdEmail style={{ marginRight: '8px' }} />
        {user.email}
      </Typography>
    </Box>
  );
};

export default UserDetail;
