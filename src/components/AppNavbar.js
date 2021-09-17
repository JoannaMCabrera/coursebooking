import React, {Fragment, useContext} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

/*context*/
import UserContext from './../UserContext';

/*react boostrap*/
import {Navbar, Nav} from 'react-bootstrap';
// import Nav from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

/*app navbar*/
export default function AppNavbar(){
  // console.log(props)
  // let user = props.user 

  // destructure context object
  const {user, unsetUser} = useContext(UserContext);

  //useHistory is a react-router-dom hook
  let history = useHistory();


  const logout = () => {
    unsetUser();
    history.push('/login');
  }

  let leftNav = (user.id !== null) ? 
        (user.isAdmin === true) ?
          <Fragment>
            <Nav.Link as={NavLink} to="/addCourse">Add Course</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Fragment>
        :
          <Fragment>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Fragment>
    :
      (
        <Fragment>
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
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