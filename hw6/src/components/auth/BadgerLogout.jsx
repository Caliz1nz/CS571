
import React, { useContext, useEffect } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext.js';
import { useNavigate } from 'react-router';

export default function BadgerLogout() {

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://cs571.org/rest/s25/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            alert("You have been logged out!");
            setLoginStatus(0);
            sessionStorage.removeItem("loggedUser");
            navigate("/");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
