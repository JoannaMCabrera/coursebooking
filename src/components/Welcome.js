import React from 'react';



export default function Welcome(props){
	console.log(props) // { name: "John"}


	return(

		<h1>Hello, {props.name}</h1>
	)
}