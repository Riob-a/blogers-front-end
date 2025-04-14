import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'
import Dashboard from './pages/DashBoard'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Blogs from './pages/Blogs'
import Profile from './pages/Profile'
import './App.css'
import RetroHeader from './pages/RetroHeader'
import BlogDetail from './pages/BlogDetail'
import MyPosts from './pages/MyPosts';
import EditPost from './pages/EditPost';
import Footer from './components/Footer';
import About from './pages/About';

function App() {
  const location = useLocation(); 
  const hideFooter = location.pathname === '/login' || location.pathname === '/logout' || location.pathname === '/register';

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/post/:id' element={<BlogDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/retro' element={<RetroHeader />} />
          <Route path='/my-posts' element={<MyPosts />} />
          <Route path ="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </div>
      <ToastContainer />
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
