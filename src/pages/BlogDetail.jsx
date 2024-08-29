import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Card, CardContent, CardMedia, CircularProgress, Grid, Paper } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import UserDetail from '../components/UserDetail';

const BlogDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [blog, setBlog] = useState(state?.blog || null);
  const [loading, setLoading] = useState(!state?.blog);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!blog) {
      const fetchBlogDetail = async () => {
        try {
          setLoading(true);
          const api = await axios.get(`https://web-dev-blog-backend.onrender.com/api/blogs/blog/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          setBlog(api.data.blog);
        } catch (error) {
          setError("Error fetching blog details");
        } finally {
          setLoading(false);
        }
      };

      fetchBlogDetail();
    }
  }, [id, blog]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography variant="h6">Blog not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="400"
          image={blog.imgUrl}
          alt={blog.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{blog.title}</Typography>
          <Typography variant="body1" paragraph>{blog.description}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {new Date(blog.createdAt).toDateString()}
          </Typography>
          <Typography variant="caption" display="block">
            <UserDetail id={blog.user} />
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BlogDetail;
