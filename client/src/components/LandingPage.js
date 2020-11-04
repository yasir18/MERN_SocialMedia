import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<div style={{ width: '60%', margin: 'auto' }}>
			<h2>Landing Page</h2>
			<br />
			<br />
			<h3>
				Socio-Connect is a platform to connect to your friends and build
				your community
			</h3>
			<h4>
				Already a member?<Link to="/login">Signin</Link>
			</h4>
			<h4>
				Not yet signed up?<Link to="/register">Signup</Link>
			</h4>
		</div>
	);
};

export default LandingPage;
