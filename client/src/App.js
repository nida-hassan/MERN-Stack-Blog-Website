import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Navbar from './component/Navbar';

import All_Blog from './component/All_Blog';
import My_Blog from './component/My_Blog';
import Add_Blog from './component/Add_Blog';
import Auth from './component/Auth';
import Update_Blog from './component/Update_Blog';
import Update_Name from './component/Update_Name';
import Update_Password from './component/Update_Password';

import Drawer from './component/Drawer.tsx';

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  const signin = useSelector((state) => state.signin);
  console.log("Sign in "+signin);

  return (
    <>
    <ToastContainer />
      <Router>
      <Drawer/>
        {/* <Navbar /> */}
        <Routes>
          { !isLoggedIn ? 
          <>
            <Route path="/" exact element={<Auth />} />
            <Route path="/auth" exact element={<Auth />} />
          </>
            : <>
            <Route path="/" exact element={<All_Blog />} />
            <Route path="/navbar" exact element={<Navbar />} />
              <Route path="/all-blog" exact element={<All_Blog />} />
              <Route path="/my-blog" exact element={<My_Blog />} />
              <Route path="/add-blog" exact element={<Add_Blog />} />
              <Route path="/update-blog/:id" exact element={<Update_Blog />} />
              <Route path="/update-name/:id" exact element={<Update_Name />} />
              <Route path="/update-password/:id" exact element={<Update_Password />} />
            </>
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
