import React, { Fragment, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

const Login = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();
		props.login(username, password);
	};
	console.log(
		'Login Render with isAuthenticated value ' + props.auth.isAuthenticated
	);
	if (props.auth.isAuthenticated) {
		return <Redirect to="/home" />;
	}
	return (
		<Fragment>
			<div className="login">
				<form onSubmit={onSubmit}>
					<TextField
						name="username"
						label="Username"
						variant="outlined"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						style={{ marginBottom: '10px' }}
					/>
					<br />
					<TextField
						name="password"
						label="Password"
						variant="outlined"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						style={{ marginBottom: '10px' }}
					/>
					<br />
					<Button type="submit" variant="contained" color="primary">
						Login
					</Button>
				</form>
				<div>
					<p>
						Not signed up? <Link to="/register">Register here</Link>
					</p>
				</div>
			</div>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { login })(Login);
