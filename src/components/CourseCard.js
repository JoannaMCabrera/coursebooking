import React from 'react';

/*react-bootstrap components*/
import {Card, Button, Row, Col} from 'react-bootstrap';

export default function CourseCard(){

	return(
		<Row className="justify-content-center my-5">
			<Col xs={10} md={6}>
				<Card>
					<Card.Body>
						<Card.Title>Sample Course</Card.Title>
						<h5>Description</h5>
						<p>This is a sample course offering</p>
						<h5>Price:</h5>
						<p>PHP 40,000</p>
				    	<Button variant="primary">Go somewhere</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}