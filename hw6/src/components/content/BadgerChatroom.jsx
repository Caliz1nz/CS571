import React, { useEffect, useState, useRef, useContext } from "react"
import BadgerMessage from "./BadgerMessage.jsx"
import { Container, Row, Col, Pagination, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext.js";
import BadgerOwnerContext from "../contexts/BadgerOwnerContext.js"

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const titleRef = useRef();
    const contentRef = useRef();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const [owner, setOwner] = useState(JSON.parse(sessionStorage.getItem("loggedUser")) ? JSON.parse(sessionStorage.getItem("loggedUser")).username : ""); 

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const deleteOneMessage = (id) => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?id=${id}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            method: "DELETE",
            credentials: "include"
        })
        .then(res => {
            if(res.status == 200){
                return res.json();
            }
            throw new Error();
        })
        .then(json => {
            alert("Successfully deleted the post!");
            loadMessages();
        })
        .catch(e => console.log(e))
    };

    const buildPage = () => {
        let pages = [];
        for(let i = 1; i <= 4; i++){
            pages.push(
                <Pagination.Item key={i} onClick={() => setPage(i)} active={page === i}>{i}</Pagination.Item>
            )
        }
        return pages;
    };

    
    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);
    useEffect(() => {
        setPage(1);
    }, [props.name]);

    const handlePostComment = (e) => {
        e?.preventDefault();

        fetch("https://cs571.org/rest/s25/hw6/whoami", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        })
        .then(res => {
            if(res.status == 200){
                return res.json();
            }
            throw new Error();
        })
        .then(json => {
            setLoginStatus(true);
            setOwner(json.user.username);
        })
        .catch(e => console.log(e));

        const titleVal = titleRef.current.value;
        const contentVal = contentRef.current.value;
        if(!loginStatus){
            alert("You must be logged in to post!");
        }
        else if(titleVal.trim().length == 0 || contentVal.trim().length == 0){
            alert("You must provide both a title and content!");
        }
        else{
            fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: titleVal,
                    content: contentVal
                })
            })
            .then(res => {
                if(res.status == 200){
                    return res.json();
                }
                throw new Error();
            })
            .then(json => {
                alert("Successfully posted!");
                loadMessages();
            })
            .catch(e => console.log(e));
        }
    };


    return <>
        <h1>{props.name} Chatroom</h1>
        <hr />
        {
            /* TODO: Allow an authenticated user to create a post. */
        }
        <Container fluid>
            <Row>
                <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Form onSubmit={handlePostComment}>
                        <Form.Label htmlFor="inputTitle">Post Title</Form.Label>
                        <Form.Control id="inputTitle" ref={titleRef}></Form.Control>
                        <br />
                        <Form.Label htmlFor="inputContent">Post Content</Form.Label>
                        <Form.Control id="inputContent" ref={contentRef}></Form.Control>
                        <br />
                        <Button type="submit">Create Post</Button>
                    </Form>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                {
                    messages.length > 0 ?
                        <>
                    {
                        /* TODO: Complete displaying of messages. */
                    }
                            <Container fluid>
                                <Row>
                                    <BadgerOwnerContext.Provider value={owner}>
                                    {messages.map(m => {
                                        return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={m.id}>
                                            <BadgerMessage deleteOneMessage={deleteOneMessage} {...m} />
                                        </Col>
                                    })}
                                    </BadgerOwnerContext.Provider>
                                </Row>
                            </Container>
                        </>
                        :
                        <>
                            <p>There are no messages on this page yet!</p>
                        </>
                }
                </Col>
            </Row>
        </Container>
        <br />
        <Pagination>
        {
            buildPage()
        }
        </Pagination>
    </>
}
