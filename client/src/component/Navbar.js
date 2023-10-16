import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import Profile_Edit from './Profile_Edit.tsx';
import Avatar from '@mui/material/Avatar';
export default function Navbar() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg background-color">
        <div className="container-fluid">
          <a className="navbar-brand" >BLOG HUB</a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon" /> */}
            <Profile_Edit className="me-5" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn &&
                <>
                  <li className="nav-item"><Link className="nav-link" aria-current="page" to="/all-blog">All Blogs</Link></li>
                  <li className="nav-item"><Link className="nav-link" aria-current="page" to="/my-blog">My Blogs</Link></li>
                  <li className="nav-item"><Link className="nav-link" aria-current="page" to="/add-blog">Add Blogs</Link></li>
                </>
              }
              {isLoggedIn ?
                <>
                  <li className="nav-item"><Link className="nav-link d-block d-lg-none" aria-current="page" to="/auth"
                    onClick={() => dispath(authActions.logout())}>
                    Log out
                  </Link></li>
                </>
                :
                <>
                  <li className="nav-item"><Link className="nav-link d-block d-lg-none" aria-current="page" to="/auth"
                    onClick={() => dispath(authActions.setSignin())}>
                    Sign in
                  </Link></li>
                  <li className="nav-item"><Link className="nav-link d-block d-lg-none" aria-current="page" to="/auth" onClick={() => dispath(authActions.setSignin())}>Log in</Link></li>
                </>
              }
            </ul>
            {isLoggedIn ?
              <>
                <Profile_Edit className="me-5" />

                <Link to="/auth" className="btn nav-bar rounded-pill shadow m-1 d-none d-lg-block"
                  onClick={() => dispath(authActions.logout())}>
                  Log out
                </Link>

              </>

              :
              <>
                <Link to="/auth" className="btn nav-bar rounded-pill shadow m-1 d-none d-lg-block" onClick={() => dispath(authActions.setSignin())}>Sign in</Link>
                <Link to="/auth" className="btn nav-bar rounded-pill shadow m-1 d-none d-lg-block" onClick={() => dispath(authActions.setSignin())}>Log in</Link>
              </>
            }
          </div>
        </div>
      </nav>

    </>
  )
}
