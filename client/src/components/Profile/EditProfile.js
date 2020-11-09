import React, { Fragment, useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { editProfile, getMyProfile } from '../../actions/profile';

const EditProfile = ({
	profile: { profile, loading },
	getMyProfile,
	editProfile,
}) => {
	const [image, setImage] = useState('');
	const [email, setEmail] = useState('');
	const [fullname, setFullname] = useState('');
	const [city, setCity] = useState('');
	const [profession, setProfession] = useState('');
	const [bio, setBio] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	useEffect(() => {
		if (!profile) getMyProfile();
		console.log('useEffect of EditProfile');
		console.log(profile);
		if (!loading && profile) {
			setEmail(profile.email);
			setFullname(profile.fullName);
			setCity(profile.city);
			setProfession(profile.profession);
			setBio(profile.bio);
		}
	}, [getMyProfile, loading, profile]);

	const onSubmit = (e) => {
		e.preventDefault();
		const formData = { image, email, fullname, city, profession, bio };
		console.log(formData);
		let form_data = new FormData();
		if (image !== '') form_data.append('profile', image);
		form_data.append('email', email);
		form_data.append('fullName', fullname);
		form_data.append('city', city);
		form_data.append('profession', profession);
		form_data.append('bio', bio);
		console.log(form_data);
		editProfile(form_data);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return <Redirect to="/home" />;
	}
	console.log('Edit Profile Render');

	return (
		<Fragment>
			<div className="login">
				<form onSubmit={onSubmit}>
					<TextField
						name="profile"
						label="Profile Picture"
						variant="outlined"
						type="file"
						onChange={(e) => setImage(e.target.files[0])}
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
					<TextField
						name="bio"
						label="Bio"
						variant="outlined"
						multiline
						rows={3}
						value={bio}
						onChange={(e) => setBio(e.target.value)}
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

EditProfile.propTypes = {
	editProfile: PropTypes.func.isRequired,
	getMyProfile: PropTypes.func.isRequired,
	profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { editProfile, getMyProfile })(
	EditProfile
);
