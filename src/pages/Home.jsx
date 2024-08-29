import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import UserDetail from '../components/UserDetail';

const Home = () => {
  const [blog, setBlog] = useState([]);

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(`https://web-dev-blog-backend.onrender.com/api/blogs/allblogs`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      console.log(api.data.blogs);
      setBlog(api.data.blogs);
    };

    fetchBlog();
  }, []);

  const truncateDescription = (description, wordLimit) => {
    if (!description) {
      return "No description available...";
    }
    return description.split(" ").splice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      {/* Banner Section */}
      <Box sx={{ pt: 0, pb: 5 }}>
        <img 
          src="/b6 (2).png" 
          alt="Banner" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            objectFit: 'cover',
            maxHeight: '100vh', 
          }} 
        />
      </Box>

      {/* Blog Content Section */}
      <Container maxWidth="lg" sx={{ mt: 4 , mb:6}}>
        <Grid container spacing={3}>
          {blog.length ? (
            blog.map((data) => (
              <Grid item xs={12} sm={6} md={4} key={data._id}>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${data._id}`}>
                  <Box sx={{ border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <img src={data.imgUrl} alt={data.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <Box sx={{ p: 2, flexGrow: 1 }}>
                      <Typography variant="h6">{capitalizeFirstLetter(data.title)}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {truncateDescription(capitalizeFirstLetter(data.description), 15)}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom>
                        {new Date(data.createdAt).toDateString()}
                      </Typography>
                      <Typography variant="caption"><UserDetail id={data.user} /></Typography>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))
          ) : (
            <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
              No data is available for selected category
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;