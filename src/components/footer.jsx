import React from 'react';
import { Container, Grid, Box, Typography, Link } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '20px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Serving In Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              "Explore, express, and connect: BlogStream is a vibrant platform where writers and readers come together to share ideas, stories, and inspiration."
            </Typography>
          </Grid>

          {/* Policies Section */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Policies
            </Typography>
            <Box>
              {['Privacy Policy', 'Terms & Conditions', 'User Data Protection', 'Disclaimer'].map((policy) => (
                <Link
                  key={policy}
                  href={`/${policy.toLowerCase().replace(/\s/g, '')}`}
                  underline="none"
                  sx={{ color: '#fff', display: 'block', marginBottom: '8px' }}
                >
                  {policy}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Follow us on social media
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <Facebook sx={{ fontSize: 24, marginRight: 2, color: '#fff' }} />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <Instagram sx={{ fontSize: 24, marginRight: 2, color: '#fff' }} />
              </Link>
              <Link href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <Twitter sx={{ fontSize: 24, marginRight: 2, color: '#fff' }} />
              </Link>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ marginTop: '10px' }}>
              Made with 🤍 by Nisha
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;