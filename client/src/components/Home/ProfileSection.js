import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMyProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { Button, Avatar } from '@material-ui/core';
import Spinner from '../utils/Spinner';

const ProfileSection = (props) => {
	const {
		getMyProfile,
		profile: { profile, loading },
	} = props;

	useEffect(() => {
		getMyProfile();
	}, [getMyProfile]);
	console.log('Profile Section render ');
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : profile == null ? (
				<>
					<p> Profile Not loaded </p>
					<p>
						Profile not created?{' '}
						<Link to="/createProfile">Create Profile</Link>
					</p>
				</>
			) : (
				<>
					<p>Profile display section</p>
					<Avatar
						alt={profile.fullName}
						src={profile.image}
						style={{
							width: '100px',
							height: '100px',
							margin: 'auto',
						}}
					/>
					<p>
						{profile.fullName}
						<br />
						<span style={{ color: '#5b9bd1' }}>
							{profile.profession}
						</span>
					</p>
					<p>
						<Link to="/viewProfile">
							<Button variant="contained" color="primary">
								View Profile
							</Button>
						</Link>
					</p>
				</>
			)}
		</Fragment>
	);
};

ProfileSection.propTypes = {
	profile: PropTypes.object.isRequired,
	getMyProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getMyProfile })(ProfileSection);
