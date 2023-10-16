import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Add_Blog() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        imageURL: "",
    });

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
        // setInput({ ...input, [e.target.name]: e.target.value })
    }
    const sendRequest = async (type = "login") => {
        try {
            const response = await axios.post("http://localhost:5000/api/blog/add", {
                title: input.title,
                description: input.description,
                image: input.imageURL,
                user: localStorage.getItem("userId"),
            });
            const data = response.data;
            console.log(data.sucess);
            if (data.sucess) {
                console.log(data)
                navigate("/my-blog");
            }
            else {
                alert(data.message)
            }

            return data;
        } catch (error) {
            console.error(error);
            alert(error);
            return { error: "An error occurred during the request." };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        sendRequest()
    }


    return (
        <>
            <h1 className='text-center mt-5'>ADD BLOGS</h1>
            <div className='d-flex justify-content-center mt-5'>
                <div className="card shadow-lg p-3 mb-5 bg-body rounded " style={{ width: '385px', border: "none" }}>
                    <img src="https://static.vecteezy.com/system/resources/previews/020/312/958/original/3d-add-user-avatar-create-group-symbol-new-profile-account-people-blue-icon-and-plus-human-person-trendy-and-modern-in-3d-style-vector.jpg" alt="User's Profile Image" className="user-image rounded mx-auto d-block rounded-circle" />

                    <h2 className='text-center auth-heading'></h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" name="title" onChange={handleChange} value={input.title} className="form-control" placeholder='Enter Title' />
                            </div>
                            <div className="mb-3">
                                <textarea type="text" name="description" onChange={handleChange} value={input.description} className="form-control" placeholder='Enter Description' style={{ margin: "0", padding: '0' }} />
                            </div>
                            <div className="mb-3">
                                <input type="text" name="imageURL" onChange={handleChange} value={input.imageURL} className="form-control" placeholder='Enter Image URL' />
                            </div>
                            <button type="submit" className="btn nav-bar w-100 rounded-pill shadow m-1  p-2">Submit</button>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
