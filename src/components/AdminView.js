import React from 'react'

import {Container, Table, Button} from 'react-bootstrap'



export default function AdminView(){

	return(
		<Container>
			<div>
				<h2>Admin Dashboard</h2>
				<div>
					<Button variant="primary">Add New Course</Button>
				</div>
			</div>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Created On</th>
					</tr>
				</thead>
				<tbody>
					{/*display the courses*/}
				</tbody>
			</Table>
		</Container>
	)
}