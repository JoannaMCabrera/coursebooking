import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/*Context*/
import UserContext from './UserContext';

/*components*/
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
// import CourseCard from './components/CourseCard';
// import Welcome from './components/Welcome';
import Courses from './pages/Courses';
// import Counter from './components/Counter';
import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from './components/ErrorPage';
import SpecificCourse from './pages/SpecificCourse';
import AddCourse from './pages/AddCourse';

export default function App(){

	const [user, setUser] = useState(
		{
			id: null,
			isAdmin: null
		}
	);

	const unsetUser = () => {
		localStorage.clear();
		setUser({
			id: null,
			isAdmin: null
		})
	}

	useEffect( () => {
		let token = localStorage.getItem('token');
		fetch('https://whispering-castle-39875.herokuapp.com/api/users/details', {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			// console.log(result) //object/ document of a user

			if(typeof result._id !== "undefined"){
				setUser({
					id: result._id,
					isAdmin: result.isAdmin
				})
			} else {
				setUser({
					id: null,
					isAdmin: null
				})
			}
		})
	}, [])

	return( 
	/*	<Fragment>
			<AppNavbar/>
			<Home/>
			<CourseCard/>
			<Welcome name="John"/>
			<Welcome name="Lawrence"/>
			<Courses/>
			<Counter/>
			<Register/>
			<Login />
		</Fragment>
	*/

	<UserContext.Provider value={{user, setUser, unsetUser}}> 
		<BrowserRouter>
			<AppNavbar/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/courses" component={Courses} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/courses/:courseId" component={SpecificCourse} />
				<Route exact path="/addCourse" component={AddCourse} />
				<Route component={ErrorPage} />
			</Switch>
		</BrowserRouter>
	</UserContext.Provider>
	)
}