import React, {useState} from 'react';

/*react-bootstrap components*/
import {Container, Form, Button} from 'react-bootstrap';

export default function Register(){

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	return(
		<Container className="mb-5">
			<h1 className="text-center">Register</h1>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formVerifyPassword">
					<Form.Label>Verify Password</Form.Label>
					<Form.Control type="password" placeholder="Verify Password" />
				</Form.Group>

				<Button variant="primary" type="submit" disabled={isDisabled}>Submit</Button>
			</Form>
		</Container>
	)
}