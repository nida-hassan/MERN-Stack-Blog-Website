import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Update_Name() {
    const naviagte = useNavigate();
    const [blog, setBlog] = useState();
    const id = useParams().id;
    console.log(id);
    const [input, setInput] = useState({});


    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }
    // const fetchDetails = async () => {
    //     const res = await axios
    //         .get(`http://localhost:5000/api/blog/${id}`)
    //         .catch((err) => console.log(err));
    //     const data = await res.data;
    //     return data;
    // };
    // useEffect(() => {
    //     fetchDetails().then((data) => {
    //         setBlog(data.blog);
    //         setInput({
    //             name: data.blog.name,
    //             description: data.blog.description,
    //         });
    //     });
    // }, [id]);
    const sendRequest = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/user/update-name/${id}`, {
                name: input.name,
                description: input.description,
            })
            const data = await res.data;
            console.log(data)
            if (data.sucess) {
                naviagte("/my-blog");
                // naviagte("/navbar");
            }
        }
        catch (e) {
            alert(e)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        sendRequest()
    }
    return (
        <>
            <h1 className='text-center mt-5'>UPDATE  USER NAME</h1>
            <div className='d-flex justify-content-center mt-5'>
                <div className="card shadow-lg p-3 mb-5 bg-body rounded " style={{ width: '385px', border: "none" }}>
                    <h2 className='text-center auth-heading'></h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" name="name" onChange={handleChange} value={input.name} className="form-control" placeholder='Enter name' />
                            </div>
                            {/* <div className="mb-3">
                                <textarea type="text" name="description" onChange={handleChange} value={input.description} className="form-control" placeholder='Enter Description' style={{ margin: "0", padding: '0' }} />
                            </div> */}
                            <button type="submit" className="btn nav-bar w-100 rounded-pill shadow m-1  p-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
