import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../UserContext';

import Swal from 'sweetalert2'

export default function AddCourse(){

	const { user } = useContext(UserContext);
	const history = useHistory();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [isActive, setIsActive] = useState(true);

	let token = localStorage.getItem('token')


	useEffect(()=>{

		if(name !== '' && description !== '' && price !== 0){
			setIsActive(true);
		}else{
			setIsActive(false);
		}

	}, [name, description, price]);


	function addCourse(e){

		e.preventDefault();

		fetch('https://course-booking-api.herokuapp.com/api/courses/addCourse', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if(data === true){

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Couse successfully added"
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

		setName('');
		setDescription('');
		setPrice(0);

	};


	return(
		<Container className="my-5">
			<h1>Create Course</h1>
			<Form onSubmit={ e => addCourse(e)}>
				<Form.Group>
					<Form.Label>Course Name:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Name of the course"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Description:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>


				<Form.Group>
					<Form.Label>Price:</Form.Label>
					<Form.Control
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</Form.Group>

				{ 
					(isActive === true) ? 
						<Button type="submit" variant="primary">Submit</Button>
					:
						<Button type="submit" variant="primary" disabled>Submit</Button>
				}
				
				
			</Form>
		</Container>
		)
}