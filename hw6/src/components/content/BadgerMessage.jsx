import React, { useContext } from "react"
import { Button, Card } from "react-bootstrap";
import BadgerOwnerContext from "../contexts/BadgerOwnerContext.js";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    const owner = useContext(BadgerOwnerContext);

    const handleDelete = (e) => {
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
            if(json.user.username == props.poster){
                props.deleteOneMessage(props.id);
            }
            else{
                alert("You may not delete another user's post!");
            }
        })
        .catch(e => console.log(e));
    }

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            owner == props.poster ? <>
                <br />
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </> : <></>
        }
    </Card>
}

export default BadgerMessage;