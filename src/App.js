import React, {Fragment} from 'react'

/*components*/
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home'
import CourseCard from './components/CourseCard';
// import Welcome from './components/Welcome';

export default function App(){

	return(
		<Fragment>
		  <AppNavbar/>
		  <Home/>
		  <CourseCard/>
		  {/*<Welcome name="John"/>
		  <Welcome name="Lawrence"/>*/}
		</Fragment>

	)
}