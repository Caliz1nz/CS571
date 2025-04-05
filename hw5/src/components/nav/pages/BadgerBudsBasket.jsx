import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BadgerBudsBasketItem from "./BadgerBudsBasketItem.jsx"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import BadgerBudsSavedIdsContext from "../../../contexts/BadgerBudsSavedIdsContext.js";
import BadgerBudsDisplayContext from "../../../contexts/BadgerBudsDisplayContext.js";
import BadgerBudsAdoptedIdsContext from "../../../contexts/BadgerBudsAdoptedIdsContext.js"


export default function BadgerBudsBasket(props) {

    const cats = useContext(BadgerBudsDataContext)
    const savedIds = JSON.parse(sessionStorage.getItem("savedCatIds")) ?? []
    const adoptedIds = JSON.parse(sessionStorage.getItem("adoptedCatIds")) ?? []
    const [display, setDisplay] = useState([])
    
    useEffect(() => {
        if(savedIds.length == 0){
            setDisplay([])
        }else{
           let filterResult = cats.filter(c => {
                for(let i of savedIds){
                    if(c.id === i){
                        return true;
                    }
                }
                return false;
            });
        setDisplay(filterResult);
    }
    }, [cats])

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Container fluid>
            <Row>
                <BadgerBudsDisplayContext.Provider value={[display, setDisplay]}>
                <BadgerBudsSavedIdsContext.Provider value={savedIds}>
                <BadgerBudsAdoptedIdsContext.Provider value={adoptedIds}>
                {
                    display.length > 0 ? display.map(c => {
                        return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={c.id}>
                            <BadgerBudsBasketItem {...c} />
                        </Col>
                    }) : "You have no buds in your basket!"
                }
                </BadgerBudsAdoptedIdsContext.Provider>
                </BadgerBudsSavedIdsContext.Provider>
                </BadgerBudsDisplayContext.Provider>
            </Row>
        </Container>
    </div>
}