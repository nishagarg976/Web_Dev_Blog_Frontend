import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const auth = useContext(context);
  const navigate = useNavigate();
  const { id } = useParams(); // Get blog ID from URL

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const api = await axios.get(`https://web-dev-blog-backend.onrender.com/api/blogs/blog/${id}`, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

        setTitle(api.data.blog.title);
        setDescription(api.data.blog.description);
        setImgUrl(api.data.blog.imgUrl);

      } catch (err) {
        toast.error("Error fetching blog details", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !description || !imgUrl) {
      setError('All fields are required');
      toast.error('All fields are required', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      setError('');
    }

    try {
      const api = await axios.put(`https://web-dev-blog-backend.onrender.com/api/blogs/${id}`, {
        title,
        description,
        imgUrl
      }, {
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

      setTimeout(() => {
        navigate('/profile');
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div 
      style={{
        backgroundImage: 'url("/bg5.png")', // Ensure the path to the image is correct
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={1500}
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
      <div className="container" style={{
        width: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <h1 className='text-center my-3'>Update Blog</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="title"
              aria-describedby="titleHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="description"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imgUrl" className="form-label">Image URL</label>
            <input
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              type="text"
              className="form-control"
              id="imgUrl"
            />
          </div>
          <div className="d-grid gap-2 my-5">
            <button type="submit" className="btn btn-primary">Update Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
