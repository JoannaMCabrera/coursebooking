import React,{useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../UserContext';

/*react-bootstrap components*/
import {
	Container,
	Row,
	Col,
	Jumbotron,
	Button
} from 'react-bootstrap';

export default function Banner(){

	const {user}= useContext(UserContext)
    const history = useHistory()

	function loc() {
        if(user.id == null){
            history.push("/login")
        }else{
            history.push("/courses")
        }
    }

	return(
/*
		<div className="container-fluid">
			<div className="row justify-content-center">
				<div className="col-10 col-md-8">
					<div className="jumbotron">
						<h1>Zuitt Coding Bootcamp</h1>
						<p>Opportunities for everyone, everywhere.</p>
						<button className="btn btn-primary">Enroll</button>
					</div>	
				</div>
			</div>
		</div>
*/
		<Container fluid>
			<Row>
				<Col className="px-0">
					<Jumbotron fluid className="px-3">
					  <h1>Zuitt Coding Bootcamp</h1>
					  <p>Opportunities for everyone, everywhere.</p>
					  <Button variant="primary" onClick={loc}>Enroll</Button>
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	)
}