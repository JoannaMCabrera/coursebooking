import React, {useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/*components*/
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
// import CourseCard from './components/CourseCard';
// import Welcome from './components/Welcome';
import Courses from './pages/Courses';
// import Counter from './components/Counter';
import Register from './pages/Register';
import Login from './pages/Login';

export default function App(){

	const [user, setUser] = useState(null);

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
	<BrowserRouter>
		<AppNavbar user={user}/>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/courses" component={Courses} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
		</Switch>
	</BrowserRouter>

	)
}