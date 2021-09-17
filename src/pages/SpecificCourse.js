import React, {useContext, useEffect, useState} from 'react';

import UserContext from './../UserContext';

import {Link, useParams, useHistory} from 'react-router-dom';

import {Container, Card, Button} from 'react-bootstrap';

import Swal from 'sweetalert2';


export default function SpecificCourse(){

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0)

	const { user } = useContext(UserContext);

	const { courseId } = useParams();

	let token = localStorage.getItem('token')

	let history = useHistory();

	useEffect( () => {
		fetch(`https://course-booking-api.herokuapp.com/api/courses/${courseId}`,
			{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			setName(result.name);
			setDescription(result.description);
			setPrice(result.price);
		})
	}, [])

	const enroll = () => {
		fetch('https://course-booking-api.herokuapp.com/api/users/enroll', 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					courseId: courseId
				})
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			if(result === true){

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Enrolled Successfully" 
				})

				history.push('/courses');
			} else {
				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Please try again" 
				})
			}
		})
	}

	return(
		<Container>
			<Card>
				<Card.Header>
					<h4>
						{/*course name*/}
						{name}
					</h4>
				</Card.Header>
				<Card.Body>
					<Card.Text>
						{/*course description*/}
						{description}
					</Card.Text>
					<h6>
						Price: Php 
						{/*course price*/}
						<span className="mx-2">{price}</span>
					</h6>
				</Card.Body>
				<Card.Footer>
					{
						(user.id !== null) ?
								<Button variant="primary" 
								onClick={ () => enroll() }

								> Enroll</Button>
							:
								<Link className="btn btn-danger" to="/login">Login to Enroll</Link>
					}
				</Card.Footer>
			</Card>
		</Container>
	)
}