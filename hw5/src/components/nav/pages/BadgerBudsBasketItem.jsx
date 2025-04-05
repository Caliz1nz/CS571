import { useContext } from "react";
import { Button, ButtonToolbar, Card, Carousel } from "react-bootstrap";
import { FcLike } from "react-icons/fc"
import BadgerBudsSavedIdsContext from "../../../contexts/BadgerBudsSavedIdsContext";
import BadgerBudsDisplayContext from "../../../contexts/BadgerBudsDisplayContext";
import BadgerBudsAdoptedIdsContext from "../../../contexts/BadgerBudsAdoptedIdsContext";

export default function BadgerBudsBasketItem(props){

    const savedIds = useContext(BadgerBudsSavedIdsContext)
    const [display, setDisplay] = useContext(BadgerBudsDisplayContext)
    const adoptedIds = useContext(BadgerBudsAdoptedIdsContext)

    const updateSavedIds = (catId) => {
        const updatedSavedIds = savedIds.filter(c => c != catId);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updatedSavedIds));
        setDisplay(() => {
            const filterResult = display.filter(c => {
                for(let i of updatedSavedIds){
                    if(c.id === i){
                        return true;
                    }
                }
                return false;
            });
            return filterResult;
        })
    }

    const unselectOneCat = () => {
        alert(`${props.name} has been removed from your basket!`);
        const unsavedId = props.id;
        updateSavedIds(unsavedId);
    }

    const adoptOneCat = () => {
        alert(`Thank you for adopting ${props.name}`);
        const adoptedId = props.id;
        adoptedIds.push(adoptedId);
        sessionStorage.setItem("adoptedCatIds", JSON.stringify(adoptedIds));
        updateSavedIds(adoptedId);
    }

    return <Card>
        <Carousel>
            {
                props.imgIds.map((id, index) => {
                    return <Carousel.Item key={`${props.id}-${index}`}>
                        <img src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${id}`} alt={`This is ${props.name}`} />
                    </Carousel.Item>
                })
            }
        </Carousel>
        <h2 className="card_word">{props.name}</h2>
        <ButtonToolbar>
            <Button className="btn_gap" onClick={unselectOneCat} variant="secondary">Unselect</Button>
            <Button className="btn_gap" onClick={adoptOneCat} variant="success">{<FcLike />} Adopt</Button>
        </ButtonToolbar>
    </Card>
}