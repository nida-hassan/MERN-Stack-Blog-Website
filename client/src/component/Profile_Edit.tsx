// import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';


import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Profile_Edit() {

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

    const [state, setState] = React.useState({
        right: false,
    });

    const updateName = async () => {
        navigate(`/update-name/${id}`);
    }
    const updatePassword = async () => {
        navigate(`/update-password/${id}`);
    }



    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSTblEVkkdJh15jlAbC3FpvuzCKb1o-pQQA&usqp=CAU" alt="User's Profile Image" className="mt-4 user-image rounded mx-auto d-block rounded-circle" />


            <div className='p-3'>
                {user && (
                    <>
                        <b className='color'>{user.name}</b>
                        <br />
                        <b className='color'>{user.email}</b>
                    </>
                )}
            </div>

            <Divider className='mt-2' />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {/* <MailIcon /> */}
                            <i className="bi bi-pencil-fill"></i>
                        </ListItemIcon>
                        <ListItemText primary="Name" onClick={updateName}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {/* <MailIcon /> */}
                            <i className="bi bi-pencil-fill"></i>
                        </ListItemIcon>
                        <ListItemText primary="Password" onClick={updatePassword}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    <div className="d-none d-lg-block">
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" onClick={toggleDrawer(anchor, true)}>
                            {user && (
                                <>
                                    {user.name.charAt(0).toUpperCase()}
                                </>
                            )}
                        </Avatar>
                    </div>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}