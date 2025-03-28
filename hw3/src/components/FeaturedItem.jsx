import { useState } from "react"
import { Button, Card, Table } from "react-bootstrap"

export default function FeaturedItem(props) {
    
    const [status, setStatus] = useState(0);
    function showAndHide(){
        setStatus(status => !status)

    }

    return <Card style={{width : '700px', height : 'auto', margin : 'auto', marginTop: '1.2rem'}}>{
        Object.keys(props).length > 0 ? <>
        <img src = {props.img} alt = {props.name} style={{ width : '300px', height : '300px', marginTop: '50px', marginLeft : '200px'}}/>
        <h2>{props.name}</h2>
        <h3>${props.price} per unit</h3>
        <div>{props.description}</div>
        {
            status ? "" : <>
            <h4>Nutrition Facts</h4>
            <Table bordered hover style={{width : '600px', marginTop : '5px', marginLeft : '50px'}}>
                <thead>
                    <tr>
                        <th>calories</th>
                        <th>carbohydrates</th>
                        <th>fat</th>
                        <th>protein</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.nutrition.calories ? props.nutrition.calories : "0"}</td>
                        <td>{props.nutrition.carbohydrates ? props.nutrition.carbohydrates : "0g"}</td>
                        <td>{props.nutrition.fat ? props.nutrition.fat : "0g"}</td>
                        <td>{props.nutrition.protein ? props.nutrition.protein : "0g"}</td>
                    </tr>
                </tbody>
            </Table>
            </>
        }
         <Button variant={status ? "primary" : "secondary"} onClick={showAndHide}>{status ? "Show" : "Hide"} Nutrition Facts</Button>
        </> : <p>Loading...</p>
    }
    </Card>
}