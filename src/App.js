import React, {Fragment} from 'react'

/*components*/
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
// import CourseCard from './components/CourseCard';
// import Welcome from './components/Welcome';
import Courses from './pages/Courses';
// import Counter from './components/Counter';
import Register from './pages/Register';

export default function App(){

	return(
		<Fragment>
		  <AppNavbar/>
		  <Home/>
		  {/*<CourseCard/>*/}
		  {/*<Welcome name="John"/>
		  <Welcome name="Lawrence"/>*/}
		  <Courses/>
		  {/*<Counter/>*/}
		  <Register/>
		</Fragment>

	)
}