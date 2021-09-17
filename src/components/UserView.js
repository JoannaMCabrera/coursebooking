import React, {useState, useEffect} from 'react';

import {Container} from 'react-bootstrap';

import Course from './Course';

export default function UserView({courseData}){

	// console.log(courseData)

	const [courses, setCourses] = useState([])

	useEffect( () => {
		const coursesArr = courseData.map( (course) => {
			// console.log(course)
			if(course.isActive === true){
				return <Course key={course._id} courseProp={course}/>
			} else {
				return null
			}
		})
		setCourses(coursesArr)
	}, [courseData])

	return(
		<Container>
			{/*display courses*/}
			{courses}
		</Container>
	)
}