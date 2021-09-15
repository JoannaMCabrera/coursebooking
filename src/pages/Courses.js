import React from 'react';
/*react-bootstrap component*/
import {Container} from 'react-bootstrap'

/*components*/
import Course from './../components/Course';

/*mock data*/
import courses from './../mock-data/courses';


export default function Courses(){

	let CourseCards = courses.map( (course) => {
		return <Course key={course.id} course={course}/>
	})
 
	return(
		<Container className="p-4">
			{CourseCards}
		</Container>
	)
}