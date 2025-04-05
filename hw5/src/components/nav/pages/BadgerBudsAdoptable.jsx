import { useContext, useEffect, useState } from "react"
import {Row, Col, Container} from "react-bootstrap"
import BadgerBudSummary from "./BudgerBudSummary.jsx";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudsSavedIdsContext from "../../../contexts/BadgerBudsSavedIdsContext.js";
import BadgerBudsDisplayContext from "../../../contexts/BadgerBudsDisplayContext.js"

export default function BadgerBudsAdoptable(props) {

    const savedIds = JSON.parse(sessionStorage.getItem("savedCatIds")) ?? []
    const adoptedIds = JSON.parse(sessionStorage.getItem("adoptedCatIds")) ?? []
    const [display, setDisplay] = useState([])
    const cats = useContext(BadgerBudsDataContext)
    
    
    useEffect(() => {
        if(savedIds.length == 0 && adoptedIds.length == 0){
            setDisplay(cats);
        }else{
            let filterResult = cats.filter(c => {
                for(let i of savedIds){
                    if(c.id === i){
                        return false;
                    }
                }
                return true;
            }).filter(c => {
                for(let i of adoptedIds){
                    if(c.id === i){
                        return false;
                    }
                }
                return true;
            })
            setDisplay(filterResult);
        }
    }, [cats])
   

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Container fluid>
            <Row>
                <BadgerBudsDisplayContext.Provider value={[display, setDisplay]}>
                <BadgerBudsSavedIdsContext.Provider value={savedIds}> 
                {
                    display.length > 0 ? display.map(c => {
                        return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={c.id}>
                            <BadgerBudSummary {...c} />
                        </Col>
                    }) : "No buds are available for adoption!"}
                </BadgerBudsSavedIdsContext.Provider>
                </BadgerBudsDisplayContext.Provider>        
            </Row>
        </Container>
    </div>
}