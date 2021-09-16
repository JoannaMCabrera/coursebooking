import React, {useState, useEffect, useContext} from 'react';

/*Context*/
import UserContext from './../UserContext';

/*react-bootstrap components*/
import {Container, Form, Button} from 'react-bootstrap';


export default function Login(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	/*destructure context object*/
	const {user, setUser} = useContext(UserContext);

	useEffect( () => {
		if(email !== '' && password !== ''){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password]);

	function login(e){
		e.preventDefault();

		alert('Login Successful');

		// update the user using email
		setUser({email: email});
		// save email to local storage
		localStorage.setItem('email', email)

		setEmail('');
		setPassword('');
	}

	return(
		<Container className="mb-5">
			<h1 className="text-center">Login</h1>
			<Form onSubmit={login}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" value={email}
					onChange={(e)=> setEmail(e.target.value) }/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password}
					onChange={(e)=> setPassword(e.target.value) }/>
				</Form.Group>

				<Button variant="primary" type="submit" disabled={isDisabled}>Submit</Button>
			</Form>
		</Container>
	)
}