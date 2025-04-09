import React, { useContext, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import { useNavigate } from 'react-router';


export default function BadgerLogin() {

    // TODO Create the login component.
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e?.preventDefault();

        const lenRegex = /^\d{7}$/;
        if(usernameRef.current.value.trim().length == 0 || passwordRef.current.value.trim().length == 0 ){
            alert("You must provide both a username and pin!");
        }
        else if(!lenRegex.test(passwordRef.current.value)){
            alert("Your pin must be a 7-digit number!");
        }
        else{
            fetch("https://cs571.org/rest/s25/hw6/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    pin: passwordRef.current.value
                })
            })
            .then(res => {
                if(res.status == 401){
                    alert("Incorrect username or pin!");
                    throw new Error();
                }
                return res.json();
            })
            .then(json => {
                sessionStorage.setItem("loggedUser", JSON.stringify(json.user));
                alert(json.msg);
                setLoginStatus(true);
                navigate("/");
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    return <>
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
            <Form.Label htmlFor="inputUsername">Username</Form.Label>
            <Form.Control id="inputUsername" ref={usernameRef}></Form.Control>
            <br />
            <Form.Label htmlFor="inputPassword">Password</Form.Label>
            <Form.Control id="inputPassword" type="password" ref={passwordRef}></Form.Control>
            <br />
            <Button type="submit">Login</Button>
        </Form> 
    </>
}
