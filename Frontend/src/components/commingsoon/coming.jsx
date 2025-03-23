import React from 'react';
import ComingSoonImage from '../../assets/Images/comingsoon.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './coming.css';

const ComingSoon = () => {
	return (
		<div>
			<Navbar />
			<div className="comingsoon-container">
				<img src={ComingSoonImage} alt="Coming Soon" className="comingsoon-image" />
				<h1>Something Exciting is Coming Soon!</h1>
				<p>We are working hard to bring you a new experience.</p>
				<p>Stay tuned for updates!</p>
				<button className="comingsoon-btn">Back to Home Page</button>
			</div>
			<Footer />
		</div>
	);
};

export default ComingSoon;