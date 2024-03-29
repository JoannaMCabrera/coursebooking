import React, {useState, useEffect, useContext} from 'react';

/*react router dom*/
import { useHistory, Redirect } from 'react-router-dom';

/*react-bootstrap components*/
import {Container, Form, Button} from 'react-bootstrap';

/*context*/
import UserContext from './../UserContext';

/*sweetalert*/
import Swal from 'sweetalert2';



export default function Register(){
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const {user} = useContext(UserContext)

	let history = useHistory();

	useEffect( () => {
		if(email !== '' && password !== '' && verifyPassword !== '' && password === verifyPassword){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password, verifyPassword]);


	function register(e){
		e.preventDefault();

		// alert('Registration Successful, you may now log in');
		fetch('https://whispering-castle-39875.herokuapp.com/api/users/checkEmail', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then( result => result.json())
		.then( result => {
			// console.log(result)	//boolean

			if(result === true){
				// alert("User already exist")
				Swal.fire({
					title: 'Duplicate email found',
					icon: 'error',
					text: 'Please choose another email'
				})
			} else {
				//what to do when user/email still not existing?

				fetch('https://whispering-castle-39875.herokuapp.com/api/users/register', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password
					})
				})
				.then( result => result.json())
				.then( result => {
					//console.log(result)	//boolean

					if(result === true){

						Swal.fire({
							title: "Registration Successful",
							icon: "success",
							text: "Welcome to Course Booking"
						})

						history.push('/login');

					} else {
						Swal.fire({
							title: 'Something went wrong',
							icon: 'error',
							text: 'Please try again'
						})
					}
				})

			}
		})

		setEmail('');
		setPassword('');
		setVerifyPassword('');
	}

	return(
		(user.id !== null) ?

			<Redirect to="/" />

		:
			<Container className="mb-5">
				<h1 className="text-center">Register</h1>
				<Form onSubmit={(e)=> register(e)}>
					<Form.Group className="mb-3" controlId="formfirstName">
						<Form.Label>First Name</Form.Label>
						<Form.Control type="text" placeholder="Enter Firstname" value={firstName}
						onChange={(e)=> setFirstName(e.target.value) }/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formlastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control type="text" placeholder="Enter Lastname" value={lastName}
						onChange={(e)=> setLastName(e.target.value) }/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formmobileNo">
						<Form.Label>Mobile Number</Form.Label>
						<Form.Control type="text" placeholder="Enter mobile mumber" value={mobileNo}
						onChange={(e)=> setMobileNo(e.target.value) }/>
					</Form.Group>

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

					<Form.Group className="mb-3" controlId="formVerifyPassword">
						<Form.Label>Verify Password</Form.Label>
						<Form.Control type="password" placeholder="Verify Password"  value={verifyPassword}
						onChange={(e)=> setVerifyPassword(e.target.value)}/>
					</Form.Group>

					<Button variant="primary" type="submit" disabled={isDisabled}>Submit</Button>
				</Form>
			</Container>
	)
}