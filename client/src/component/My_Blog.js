import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import Blog_Cart from './Blog_Cart';
// import Profile_Edit from './Profile_Edit.t';


export default function My_Blog() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const id = localStorage.getItem("userId");

    const sendRequest = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
                .catch((err) => console.log(err));
            const data = await response.data;
            return data;
        } catch (error) {
            console.error(error);
            alert(error);
            return { error: "An error occurred during the request." };
        }
    };
    useEffect(() => {
        sendRequest().then((data) => setUser(data.user));
    }, []);
    console.log(user);

    return (
        <>
            <h1 className='text-center mt-5'>MY BLOGS</h1>
            <div className="container d-flex justify-content-evenly">
                <div className="row ">
                    {user &&
                        user.blogs &&
                        user.blogs.map((blog, index) => (
                            <>
                                <Blog_Cart
                                    id={blog._id}
                                    key={index}
                                    isUser={true}
                                    title={blog.title}
                                    description={blog.description}
                                    imageURL={blog.image}
                                    username={user.name}
                                />
                            </>
                        ))}
                        
                </div>
            </div>
        </>
    )
}
