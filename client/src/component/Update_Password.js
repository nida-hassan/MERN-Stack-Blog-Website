import { EditNoteRounded } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Update_Password() {
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState("");


    const naviagte = useNavigate();
    const [blog, setBlog] = useState();
    const id = useParams().id;
    const [input, setInput] = useState({
        previous: "",
        newPassword: "",
        reEnter: "",
    });


    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
        console.log(input)
    }
    const sendRequest = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/user/update-password/${id}`, {
                previous: input.previous,
                newPassword: input.newPassword,
            })
            const data = await res.data;
            if (data.success) {
                toast.success('Password updated successfully');
                // alert("sucess")
                setIsPasswordIncorrect(" ");
                naviagte("/my-blog");
            }
        }
        catch (e) {
            setIsPasswordIncorrect("Password incorrect");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.newPassword === input.reEnter) {
            setIsPasswordMatch(" ")
            sendRequest()

        }
        else {
            setIsPasswordMatch("Password doesn't match")
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
            <h1 className='text-center mt-5'>UPDATE  USER PASSWORD</h1>
            <div className='d-flex justify-content-center mt-5'>
                <div className="card shadow-lg p-3 mb-5 bg-body rounded " style={{ width: '385px', border: "none" }}>
                    <h2 className='text-center auth-heading'></h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>


                            <div className="mb-3">
                                <div className="input-group">
                                    <input type={eye ? "password" : "text"} name="previous" onChange={handleChange} value={input.previous} className="form-control" placeholder='Enter Previous Password' />
                                    <span className="input-group-text">
                                        <i className={`bi ${eye ? "bi-eye-fill" : "bi-eye-slash-fill"}`} onClick={handleEye} style={{ cursor: 'pointer' }}></i>
                                    </span>
                                </div>
                                <b className="text-danger mb-2">{isPasswordIncorrect}</b>
                            </div>

                            <div className="mb-3">
                                <div className="input-group">
                                    <input type={eye ? "password" : "text"} name="newPassword" onChange={handleChange} value={input.newPassword} className="form-control" placeholder='Enter New Password' />
                                    <span className="input-group-text">
                                        <i className={`bi ${eye ? "bi-eye-fill" : "bi-eye-slash-fill"}`} onClick={handleEye} style={{ cursor: 'pointer' }}></i>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="input-group">
                                    <input type={eye ? "password" : "text"} name="newPassword" name="reEnter" onChange={handleChange} value={input.reEnter} className="form-control" placeholder='Re-enter New Password' />
                                    <span className="input-group-text">
                                        <i className={`bi ${eye ? "bi-eye-fill" : "bi-eye-slash-fill"}`} onClick={handleEye} style={{ cursor: 'pointer' }}></i>
                                    </span>
                                </div>
                            </div>





                            <b className="text-danger mb-2">{isPasswordMatch}</b>
                            <button type="submit" className="btn nav-bar w-100 rounded-pill shadow m-1  p-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
