import React, {useState, useEffect} from 'react';

/*react-bootstrap component*/
import {Container} from 'react-bootstrap'


export default function Counter(){

	const [count, setCount] = useState(0);

	useEffect( () => {
		//statement
		document.title = `You clicked ${count} times`

	}, [count]);

	return(
		<Container className="m-4">
			<h1>You clicked {count} times</h1>
			<button className="btn btn-primary" 
			onClick={ () => { setCount( count + 1)}}
			>Click Me</button>
		</Container>
	)
}