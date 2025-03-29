const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <strong>{props.major}</strong>
        <p>{props.name.first} is taking {props.numCredits} credit(s) and {props.fromWisconsin ? "is" : "is NOT"} from Wisconsin</p>
        <p>He/She has {props.interests.length} interests including...</p>
        <ul>
            {
                props.interests.map((interest, index) => {
                    return <li key={`${props.id}-${index}`}>{interest}</li>
                })
            }
        </ul>
    </div>
}

export default Student;