import React, {useState, useEffect} from 'react'

import {Container, Table, Button, Modal, Form} from 'react-bootstrap'

import Swal from 'sweetalert2';



export default function AdminView(props){
	console.log(props)

	const { courseData, fetchData } = props;
	console.log(courseData) //array of courses

	const [courseId, setCourseId] = useState('');
	const [courses, setCourses] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	let token = localStorage.getItem('token');

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);



	const openEdit = (courseId) => {
		fetch(`https://course-booking-api.herokuapp.com/api/courses/${courseId}`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			setCourseId(result._id);
			setName(result.name);
			setDescription(result.description);
			setPrice(result.price)
		})

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);
		setName("")
		setDescription("")
		setPrice(0)
	}

	useEffect( () => {
		const coursesArr = courseData.map( (course) => {
			console.log(course)
			return(
				<tr key={course._id}>
					<td>{course.name}</td>
					<td>{course.description}</td>
					<td>{course.price}</td>
					<td>
						{
							(course.isActive === true) ?
								<span>Available</span>
							:
								<span>Unavailable</span>
						}
					</td>
					<td>
						<Button variant="primary" size="sm" 
						onClick={ ()=> openEdit(course._id) }>
							Update
						</Button>

						{
							(course.isActive === true) ?
								<Button variant="danger" size="sm"
								onClick={()=> archiveToggle(course._id, course.isActive)}>
									Disable
								</Button>
							:
								<Button variant="success" size="sm"
								onClick={ () => archiveToggle(course._id, course.isActive)}>
									Enable
								</Button>
						}

					</td>
				</tr>
			)
		})

		setCourses(coursesArr)
	}, [courseData])

	/*edit course function*/
	const editCourse = (e, courseId) => {

		e.preventDefault()

		fetch(`https://course-booking-api.herokuapp.com/api/courses/${courseId}/edit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result) //updated course document

			fetchData()

			if(typeof result !== "undefined"){
				// alert("success")

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Course successfully updated!"
				})

				closeEdit();
			} else {

				fetchData()

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Something went wrong!"
				})
			}
		})
	}

	/*update course*/
	const archiveToggle = (courseId, isActive) => {

		fetch(`https://course-booking-api.herokuapp.com/api/courses/${courseId}/archive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Course successfully archived/unarchived"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					"text": "Please try again"
				})
			}
		})
	}

	const addCourse = (e) => {
		e.preventDefault()
		fetch('https://course-booking-api.herokuapp.com/api/courses/addCourse', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			if(result === true){
				fetchData()

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Course successfully added"
				})

				setName("")
				setDescription("")
				setPrice(0)

				closeAdd();

			} else {
				fetchData();

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Something went wrong"
				})
			}
		})
	}

	return(
		<Container>
			<div>
				<h2 className="text-center">Admin Dashboard</h2>
				<div className="d-flex justify-content-end mb-2">
					<Button variant="primary" onClick={openAdd}>Add New Course</Button>
				</div>
			</div>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{/*display the courses*/}
					{courses}
				</tbody>
			</Table>
		{/*Edit Course Modal*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={ (e) => editCourse(e, courseId) }>
					<Modal.Header>
						<Modal.Title>Edit Course</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="courseName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={name}
								onChange={ (e)=> setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="courseDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={ (e)=> setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="coursePrice">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								value={price}
								onChange={ (e)=> setPrice(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		{/*Add Course Modal*/}
		<Modal show={showAdd} onHide={closeAdd}>
			<Form onSubmit={ (e) => addCourse(e) }>
				<Modal.Header>Add Course</Modal.Header>
				<Modal.Body>
					<Form.Group courseId="courseName">
						<Form.Label>Name</Form.Label>
						<Form.Control 
							type="text"
							value={name}
							onChange={(e)=> setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group courseId="courseDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							type="text"
							value={description}
							onChange={(e)=> setDescription(e.target.value)}
						/>
					</Form.Group>
					<Form.Group courseId="coursePrice">
						<Form.Label>Price</Form.Label>
						<Form.Control 
							type="number"
							value={price}
							onChange={(e)=> setPrice(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeAdd}>Close</Button>
					<Button variant="success" type="submit">Submit</Button>
				</Modal.Footer>
			</Form>
		</Modal>
		</Container>
	)
}