import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<div
			style={{
				margin: 'auto',
				width: '100%',
				height: '100%',
				backgroundImage:
					'url(https://image.freepik.com/free-photo/digital-world-map-hologram-blue-background_1379-900.jpg)',
			}}
		>
			{' '}
			<div style={{ padding: '10%', color: 'white' }}>
				{/* <img src="https://image.freepik.com/free-photo/digital-world-map-hologram-blue-background_1379-900.jpg" /> */}
				<h2>SocioConnect</h2>
				<br />
				<br />
				<h3>
					Socio-Connect is a platform to connect to your friends and
					build your community
				</h3>
				<h4>
					Already a member?<Link to="/login">Signin</Link>
				</h4>
				<h4>
					Not yet signed up?<Link to="/register">Signup</Link>
				</h4>
			</div>
		</div>
	);
};

export default LandingPage;
