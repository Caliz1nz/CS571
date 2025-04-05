import { useContext, useEffect, useState } from "react";
import { Button, ButtonToolbar, Card, Carousel } from "react-bootstrap";
import { BiLike } from "react-icons/bi"
import BadgerBudsSavedIdsContext from "../../../contexts/BadgerBudsSavedIdsContext";
import BadgerBudsDisplayContext from "../../../contexts/BadgerBudsDisplayContext";


export default function BadgerBudSummary(props){

    const [status, setStatus] = useState(0)

    const savedIds = useContext(BadgerBudsSavedIdsContext)
    const [display, setDisplay] = useContext(BadgerBudsDisplayContext)

    const showAndHide = () => {
        setStatus(status => !status)
    }

    const saveOneCat = () => {
        alert(`${props.name} has been added to your basket!`);
        const savedId = props.id;
        savedIds.push(savedId);
        sessionStorage.setItem("savedCatIds", JSON.stringify(savedIds));
        setDisplay(() => {
            const filterResult = display.filter(c => {
                for(let i of savedIds){
                    if(c.id === i){
                        return false;
                    }
                }
                return true;
            });
            return filterResult;
        });
    }


    return <Card>
        {
            status ? <Carousel>
                {
                    props.imgIds.map((id, index) => {
                        return <Carousel.Item key={`${props.id}-${index}`}>
                                    <img src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${id}`} alt={`This is ${props.name}`} />
                               </Carousel.Item>
                    })
                }
                    </Carousel> : 
                <img src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${props.imgIds[0]}`} alt={`This is ${props.name}`} />
        }
        <h2 className="card_word">{props.name}</h2>
        <div className="card_word">
            {status ? <>
                <p>{props.gender}</p>
                <p>{props.breed}</p>
                <p>{props.age}</p>
                <p>{props.description}</p>
            </> : ""}
        </div>
        <ButtonToolbar>
            <Button className="btn_gap" onClick={showAndHide}>{status ? "Show less" : "Show more"}</Button>
            <Button className="btn_gap" onClick={saveOneCat} variant="secondary">{<BiLike />} Save</Button>
        </ButtonToolbar>
    </Card>
}