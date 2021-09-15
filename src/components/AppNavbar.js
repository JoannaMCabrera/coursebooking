import React, {Fragment} from 'react';
import { Link, NavLink } from 'react-router-dom';

/*react boostrap*/
import {Navbar, Nav} from 'react-bootstrap';
// import Nav from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

/*app navbar*/
export default function AppNavbar(props){
  // console.log(props)
  let user = props.user

  let leftNav = (user === null) ? (
      <Fragment>
        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
      </Fragment>
    ) 
    : (
      <Fragment>
        <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
      </Fragment>
    )


  return (
    <Navbar bg="info" expand="lg">
      <Navbar.Brand as={Link} to="/">Course Booking</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/courses">Courses</Nav.Link>
        </Nav>
        <Nav>
          {leftNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}