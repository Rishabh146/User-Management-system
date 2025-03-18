import { useState } from 'react'
import Button from '@mui/joy/Button';
import Layout from '../components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';
import PageNotFound from '../pages/PageNotFound';
import Register from '../Auth/Register';
import Login from '../Auth/Login';


function App() {
 

  return (
    <>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/*" element={<PageNotFound/>}/>
      <Route   path="/register"  element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>
    </>
  )
}

export default App
