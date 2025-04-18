import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext.js";

import crest from '../../assets/uw-crest.svg'


function BadgerLayout(props) {

    // TODO @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.
    const init1Val = sessionStorage.getItem("loggedUser") ? 1 : 0 
    const [loginStatus, setLoginStatus] = useState(init1Val)


    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            loginStatus ? <Nav.Link as={Link} to="logout">Logout</Nav.Link> : <><Nav.Link as={Link} to="login">Login</Nav.Link>
                            <Nav.Link as={Link} to="register">Register</Nav.Link></>
                        }
                        
                        <NavDropdown title="Chatrooms">
                            {
                                /* TODO Display a NavDropdown.Item for each chatroom that sends the user to that chatroom! */
                                
                            }
                            <NavDropdown.Item as={Link} to="chatrooms/Bascom Hill Hangout">Bascom Hill Hangout</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Memorial Union Meetups">Memorial Union Meetups</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Witte Whispers">Witte Whispers</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Chadbourne Chats">Chadbourne Chats</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Red Gym Rendezvous">Red Gym Rendezvous</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Babcock Banter">Babcock Banter</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="chatrooms/Humanities Hubbub">Humanities Hubbub</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;