import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Register = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();
		props.register(username, password);
	};
	if (props.auth.isAuthenticated) {
		return <Redirect to="/createProfile" />;
	}
	return (
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
					Register
				</Button>
			</form>
		</div>
	);
};
Register.propTypes = {
	register: PropTypes.func.isRequired,
	auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { register })(Register);
