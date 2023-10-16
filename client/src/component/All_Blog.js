import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Blog_Cart from './Blog_Cart';

export default function All_Blog({ title, description, imageURL, username, isUser, id }) {
    const [blogs, setBlogs] = useState();
    const sendRequest = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/blog")
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
        sendRequest().then((data) => setBlogs(data.blogs));
    }, []);


    return (
        <>
            <h1 className='text-center mt-5'>ALL BLOGS</h1>
            <div className="container d-flex justify-content-evenly">
                <div className="row ">
                    {blogs &&
                        blogs.map((blog, index) => (
                            <Blog_Cart
                                id={blog._id}
                                isUser={localStorage.getItem("userId") === blog.user._id}
                                title={blog.title}
                                description={blog.description}
                                imageURL={blog.image}
                                username={blog.user.name}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}
