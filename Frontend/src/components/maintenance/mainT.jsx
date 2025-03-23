import React from 'react';
import MImage from '../../assets/Images/maintance.jpg';

import './maintenance.css';

const Maintenance = () => {
	return (
		<div>
		<Navbar /> 
		<div className="maintenance-container">
			<img src={MImage} alt="Maintenance Mode" className="maintenance-image" />
			<h1>Planned Maintenance in Progress</h1>
			<p>Our engineers are currently performing scheduled maintenance on the fleet.</p>
			<p>We apologize for any inconvenience.</p>
			<button className="maintenance-btn">Back to Home Page</button>
		</div>
		<Footer/>
		</div>
	);
};

export default Maintenance;