import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext.js';


export default function BadgerRegister() {

    // TODO Create the register component.

    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputRepeatPassword, setRepeatPassword] = useState("");
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e?.preventDefault();

        const lenRegex = /^\d{7}$/;
        if(inputUsername.trim().length == 0 || inputPassword.trim().length == 0 ){
            alert("You must provide both a username and pin!");
        }
        else if(!lenRegex.test(inputPassword)){
            alert("Your pin must be a 7-digit number!");
        }
        else if(inputPassword !== inputRepeatPassword){
            alert("Your pins do not match!");
        }
        else{
            fetch("https://cs571.org/rest/s25/hw6/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: inputUsername,
                    pin: inputPassword
                })
            })
            .then(res => {
                if(res.status == 409){
                    alert("That username has already been taken!");
                    throw new Error();
                }
                else if(res.status == 413){
                    alert("'username' must be 64 characters or fewer");
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
        <h1>Register</h1>
        <Form onSubmit={handleRegister}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" value={inputUsername} onChange={e => setInputUsername(e.target.value)}></Form.Control>
            <br />
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" value={inputPassword} onChange={e => setInputPassword(e.target.value)}></Form.Control>
            <br />
            <Form.Label htmlFor="repeatPasswordInput">Repeat Password</Form.Label>
            <Form.Control id="repeatPasswordInput" type="password" value={inputRepeatPassword} onChange={e => setRepeatPassword(e.target.value)}></Form.Control>
            <br />
            <Button type="submit">Register</Button>
        </Form>
    </>
}
