import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Blog_Cart({
    title,
    description,
    imageURL,
    username,
    isUser,
    id,
}) {
    const naviagte = useNavigate();

    const handleEdit = () => {
        naviagte(`/update-blog/${id}`);
    };
    useEffect(() => {
    //    deleteRequest()
    }, []);

    
    const deleteRequest = async () => {
        try {
            const response = await axios
                .delete(`http://localhost:5000/api/blog/${id}`)
                .catch((err) => console.log(err));
            const data = response.data;
            console.log(data.sucess);

            if (data.sucess) {
                toast.success("sucessfullty deleted");
                console.log(data);
                // window.location.reload();
                naviagte("/my-blog");
            } else {
                // toast.error("unable to delete");
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            alert(error);
            return { error: "An error occurred during the request." };
        }
    };
    const handleDelete = () => {
        deleteRequest();
    };

    return (
        <>
            <div className="col-lg-4 col-sm-12" >
                <div className="card shadow p-3 mb-5 bg-body rounded card-hover">
                    <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                            <div className="d-flex align-items-center mb-3">
                                <div className="author-circle">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <p className="card-text">
                                    <b className="auth-heading">Title: </b>
                                    {title}
                                </p>
                            </div>
                        </div>

                        {isUser && (
                            <div className="ms-auto p-2 bd-highlight icons">
                                <i
                                    className="bi bi-trash-fill text-danger me-3"
                                    onClick={handleDelete}
                                ></i>
                                <i className="bi bi-pencil-fill" onClick={handleEdit}></i>
                            </div>
                        )}
                    </div>
                    <img src={imageURL} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <p className="card-text">
                            <b className="auth-heading">Author: </b>
                            <b>{username}</b>
                        </p>
                        <p className="card-text"style={{textAlign:'justify'}}>
                            <b className="auth-heading">Description: </b>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
