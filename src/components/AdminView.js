import React, {useState, useEffect} from 'react'

import {Container, Table, Button} from 'react-bootstrap'



export default function AdminView(props){
	console.log(props)

	const { courseData, fetchData } = props;
	console.log(courseData) //array of courses

	const [courseId, setCourseId] = useState('');
	const [courses, setCourses] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const openEdit = (courseId) => {
		let token = localStorage.getItem('token')
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

						{/*{
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
*/}
					</td>
				</tr>
			)
		})

		setCourses(coursesArr)
	}, [courseData])

	return(
		<Container>
			<div>
				<h2 className="text-center">Admin Dashboard</h2>
				<div className="d-flex justify-content-end mb-2">
					<Button variant="primary">Add New Course</Button>
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
		</Container>
	)
}