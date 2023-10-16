import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Auth() {
    const naviagte = useNavigate();
    const dispath = useDispatch();

    // login code
    // const [signin, setSignin] = useState(false)
    // const dispatch = useDispatch();
    const signin = useSelector((state) => state.signin);
    const [input, setInput] = useState({ name: "", email: "", password: "" })
    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
        // setInput({ ...input, [e.target.name]: e.target.value })
    }
    // sending request to signin/login api
    const sendRequest = async (type = "login") => {
        try {
            const response = await axios.post(`http://localhost:5000/api/user/${type}`, {
                name: input.name,
                email: input.email,
                password: input.password
            });
            const data = response.data;
            console.log(data.sucess);
            if (data.sucess) {
                localStorage.setItem("userId", data.user._id);
                dispath(authActions.login());
                naviagte("/all-blog");
            }
            else {
                toast.error(data.message)
            }

            return data;
        } catch (error) {
            console.error(error);
            toast.error(error);
            return { error: "An error occurred during the request." };
        }
    };


    // login/signin from code
    const [errorName, setErrorName] = useState()
    const [errorEmail, setErrorEmail] = useState()
    const [errorPassword, setErrorPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)

        try {
            if (signin) {
                sendRequest("signin")
            }
            else {
                sendRequest()
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    // eye code
    const [eye, setEye] = useState(true)
    const handleEye = () => {
        const newEye = !eye
        setEye(newEye)
    }

    return (
        <>
            <div className='d-flex justify-content-center mt-5'>
                <div className="card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '385px', border: "none" }}>
                    
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSTblEVkkdJh15jlAbC3FpvuzCKb1o-pQQA&usqp=CAU" alt="User's Profile Image" className="user-image rounded mx-auto d-block rounded-circle" />
                    
                    <h2 className='text-center auth-heading'>
                        {signin ? "SIGN IN" : "LOGIN IN"}
                    </h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {signin &&
                                <div className="mb-3">
                                    <input type="text" name="name" className="form-control" placeholder='Enter Name' value={input.name} onChange={handleChange} />
                                    <p className='text-danger'>{errorName}</p>
                                </div>

                            }
                            <div className="mb-3">
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Email' value={input.email} onChange={handleChange} />
                                <p className='text-danger'>{errorEmail}</p>
                            </div>
                            <div className="mb-3">
                                <div className="input-group">
                                    <input type={eye ? "password" : "text"} name="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' value={input.password} onChange={handleChange} />
                                    <span className="input-group-text">
                                        <i className={`bi ${eye ? "bi-eye-fill" : "bi-eye-slash-fill"}`} onClick={handleEye} style={{ cursor: 'pointer' }}></i>
                                    </span>
                                </div>
                                <p className='text-danger'>{errorPassword}</p>
                            </div>
                            <Link className='link-tag text-danger'onClick={() => dispath(authActions.setSignin(signin ? false :true))}>
                                {signin ? "Already have an account?" : "Don't have and account?"}
                            </Link>
                            <button type="submit" className="btn nav-bar w-100 rounded-pill shadow m-1 p-2">Submit</button>
                            {signin && <button type="submit" className="btn  nav-bar  w-100 rounded-pill shadow mt-3"><FcGoogle size={30} className='me-4' />Sign In with Google</button>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
