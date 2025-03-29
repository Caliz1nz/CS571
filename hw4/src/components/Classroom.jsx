import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student"

const Classroom = () => {

    const [originalData, setOriginalData] = useState([]);
    const [students, setStudents] = useState([]);
    const [nameInCondition, setNameInCondition] = useState("");
    const [majorInCondition, setMajorInCondition] = useState("");
    const [interestInCondition, setInterestInCondition] = useState("");
    const [page, setPage] = useState(1);
    useEffect(() => {
        let searchResult = originalData.filter(stu => {
            let searchWithName = nameInCondition === "" ? false : true;
            let searchWithMajor = majorInCondition === "" ? false : true;
            let searchWithInterest = interestInCondition === "" ? false : true;
            const stuName = stu.name.first + " " + stu.name.last;
            return (searchWithName ? stuName.toLowerCase().includes(nameInCondition.trim().toLowerCase()) : true)
                    && (searchWithMajor ? stu.major.toLowerCase().includes(majorInCondition.trim().toLowerCase()) : true)
                    && (searchWithInterest ? stu.interests.some(interest => interest.toLowerCase().includes(interestInCondition.trim().toLowerCase())) : true);
		});
        setStudents(searchResult);
    }, [originalData, nameInCondition, majorInCondition, interestInCondition])
    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => {
            if(res.status == 200 || res.status == 304){
                return res.json();
            } else{
                throw new Error();
            }
        })
        .then(data => {
            setOriginalData(data)
            setStudents(data);
        })
    }, []);

    const reset = () => {
        setNameInCondition("");
        setMajorInCondition("");
        setInterestInCondition("");
        setPage(1);
    }

    const buildPrevious = () => {
        return <Pagination.Prev key={0} onClick={() => setPage(n => n > 1 ? n - 1 : n)}>Previous</Pagination.Prev>
    }

    const buildPage = () => {
        let pages = [];
        const numOfPages = Math.ceil(students.length / 24);
        for(let i = 1;i <= numOfPages; i++){
            pages.push(
                <Pagination.Item key={i} onClick={() => setPage(i)} active={page === i}>{i}</Pagination.Item>
            )
        }
        return pages;
    }

    const buildNext = () => {
        const numOfPages = Math.ceil(students.length / 24);
        return <Pagination.Next key={numOfPages+1} onClick={() => setPage(n => n < numOfPages ? n + 1 : n)}>Next</Pagination.Next>
    }

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={nameInCondition} onChange={e => setNameInCondition(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={majorInCondition} onChange={e => setMajorInCondition(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={interestInCondition} onChange={e => setInterestInCondition(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={reset}>Reset Search</Button>
        </Form>
        {students ? <p>There are {students.length} student(s) matching your search.</p> : <p></p>}
        <Container fluid>
            <Row>
                {
                    students.length > 0 ? students.slice((page-1)*24, page*24).map(s => {
                        return <Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Student {...s} />
                        </Col>
                    }) : <p>Loading students...</p>
                }
            </Row>
        </Container>
        <Pagination>
            {buildPrevious()}
            {buildPage()}
            {buildNext()}
        </Pagination>
    </div>

}

export default Classroom;