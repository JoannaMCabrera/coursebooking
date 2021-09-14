import React from 'react';
import ReactDOM from 'react-dom';
/*bootstrap*/
import 'bootstrap/dist/css/bootstrap.min.css';

/*components*/
import AppNavbar from './components/AppNavbar';
import Banner from './components/Banner';

ReactDOM.render(
  <div>
    <AppNavbar/>
    <Banner />
  </div>,
  document.getElementById('root')
);


