import React from 'react';

/*react-bootstrap components*/
import {Card, Button} from 'react-bootstrap';

export default function Course(props){
	console.log(props)
	let course = props.course
	return(
		<Card>
			<Card.Body>
				<Card.Title>{course.name}</Card.Title>
				<h5>Description</h5>
				<p>{course.description}</p>
				<h5>Price:</h5>
				<p>{course.price}</p>
		    	<Button variant="primary">Enroll</Button>
			</Card.Body>
		</Card>
	)
}