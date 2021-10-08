import React, {useState, useEffect, useContext} from 'react';
/*react-bootstrap component*/
import {Container} from 'react-bootstrap'

/*components*/
// import Course from './../components/Course';
import AdminView from './../components/AdminView.js';
import UserView from './../components/UserView.js';


/*mock data*/
// import courses from './../mock-data/courses';

/*context*/
import UserContext from './../UserContext';

export default function Courses(){

	const [courses, setCourses] = useState([]);

	const {user} = useContext(UserContext);

	// let token = localStorage.getItem('token')
	const fetchData = () => {
		let token = localStorage.getItem('token')

		fetch('https://whispering-castle-39875.herokuapp.com/api/courses/all',{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			setCourses(result)
		})
	}

	useEffect( () => {
		fetchData()
	}, [])

	// let CourseCards = courses.map( (course) => {
	// 	return <Course key={course.id} course={course}/>
	// })
 	console.log(fetchData);
	return(
		<Container className="p-4">
			{ (user.isAdmin === true || user.isAdmin !== null) ?
					<AdminView courseData={courses} fetchData={fetchData}/>
				:
					<UserView courseData={courses} />
			}
		</Container>
	)
}
