import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

/*react-bootstrap components*/
import {Card, Button} from 'react-bootstrap';

export default function Course({courseProp}){
	console.log(courseProp)

	const {name, description, price} = courseProp
	// console.log(name)

	//[state, setState] = useState()
	const [count, setCount] = useState(0);
	const [seat, setSeat] = useState(10);
	const [isDisabled, setIsDisabled] = useState(false);

	//handler
	function enroll(){
		//conditional rendering
		if(seat > 0){
			setCount(count + 1)
			setSeat(seat - 1)

		} 
		// else {
		// 	alert('No seats available')
		// }
	}

	useEffect( () => {

		if(seat === 0){
			setIsDisabled(true)
		}

	}, [seat]);


	return(
		<Card className="mb-3">
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<h5>Description</h5>
				<p>{description}</p>
				<h5>Price:</h5>
				<p>{price}</p>
				<h5>Enrollees</h5>
				<p>{count} Enrollees</p>
				<h5>Seats</h5>
				<p>{seat} Seats</p>
		    	<Button variant="primary" onClick={enroll} disabled={isDisabled}>Enroll</Button>
			</Card.Body>
		</Card>
	)
}


Course.propTypes = {
	course: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}