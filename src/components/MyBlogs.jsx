import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Box, Container, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDetail from '../components/UserDetail';
import context from '../context/AuthContext';
import UpdateBlog from './updateBlog';

const MyBlogs = () => {
  const [blog, setBlog] = useState([]);
  const auth = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const api = await axios.get('https://web-dev-blog-backend.onrender.com/api/blogs/myblogs', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setBlog(api.data.blogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlog();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const api = await axios.delete(`https://web-dev-blog-backend.onrender.com/api/blogs/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      toast.success(api.data.message, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setBlog((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error('Failed to delete blog', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      console.error('Failed to delete blog:', error);
    }
  };

  const editBlog = (id) => {
    navigate(`/UpdateBlog/${id}`);
  };

  const truncateDescription = (description, maxLength = 15) => {
    if (description.split(' ').length <= maxLength) return description;
    return description.split(' ').slice(0, maxLength).join(' ') + '...';
  };

  return (
    <>
      <ToastContainer />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {blog.length ? (
            blog.map((data) => (
              <Grid item xs={12} sm={6} md={4} key={data._id}>
                <Box sx={{ border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Link to={`/details/${data._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={data.imgUrl} alt={data.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <Box sx={{ p: 2, flexGrow: 1 }}>
                      <Typography variant="h6">{data.title}</Typography>
                      <Typography variant="body2">
                        {truncateDescription(data.description)}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom>
                        {new Date(data.createdAt).toDateString()}
                      </Typography>
                      <Typography variant="caption">
                        <UserDetail id={data.user} />
                      </Typography>
                    </Box>
                  </Link>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="warning" onClick={() => editBlog(data._id)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => deleteBlog(data._id)}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
              No blogs found
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default MyBlogs;
