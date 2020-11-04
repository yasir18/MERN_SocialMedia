import React, { Fragment, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { createProfile } from '../actions/profile';

const CreateProfile = (props) => {
	const [profile, setProfile] = useState('');
	const [email, setEmail] = useState('');
	const [fullname, setFullname] = useState('');
	const [city, setCity] = useState('');
	const [profession, setProfession] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();
		const formData = { profile, email, fullname, city, profession };
		console.log(formData);
		let form_data = new FormData();
		form_data.append('profile', profile);
		form_data.append('email', email);
		form_data.append('fullName', fullname);
		form_data.append('city', city);
		form_data.append('profession', profession);
		console.log(form_data);
		props.createProfile(form_data);
	};
	if (!props.auth.isAuthenticated) {
		return <Redirect to="/login" />;
	}
	console.log('createProfile Render ');
	return (
		<Fragment>
			<div className="login">
				<form onSubmit={onSubmit}>
					<TextField
						name="profile"
						label="Profile Picture"
						variant="outlined"
						type="file"
						onChange={(e) => setProfile(e.target.files[0])}
						style={{ marginBottom: '10px' }}
					/>
					<br />
					<TextField
						name="email"
						label="Email"
						variant="outlined"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={{ marginBottom: '10px' }}
					/>
					<br />
					<TextField
						name="fullname"
						label="FullName"
						variant="outlined"
						value={fullname}
						onChange={(e) => setFullname(e.target.value)}
						style={{ marginBottom: '10px' }}
					/>
					<br />
					<TextField
						name="city"
						label="City"
						variant="outlined"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						style={{ marginBottom: '10px' }}
					/>
					<br />
					<TextField
						name="profession"
						label="Profession"
						variant="outlined"
						value={profession}
						onChange={(e) => setProfession(e.target.value)}
						style={{ marginBottom: '20px' }}
					/>
					<br />
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</form>
			</div>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { createProfile })(CreateProfile);

//see why does refreshing the page making it go to home page
//compare debug flow of Private routes of both dev connector and your mern
