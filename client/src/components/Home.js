import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { getMyProfile } from '../actions/profile';
import { Link } from 'react-router-dom';
import { Button, Avatar } from '@material-ui/core';
import Spinner from './Spinner';

const Home = (props) => {
	const {
		getMyProfile,
		profile: { profile, loading },
	} = props;

	console.log(
		'Home Render with isAuthenticated value ' + props.auth.isAuthenticated
	);
	console.log('Home Render with profile value ' + profile);
	useEffect(() => {
		getMyProfile();
	}, [getMyProfile]);

	return (
		<Fragment>
			<div
				className="container"
				style={{ margin: '20px 0px', fontFamily: 'cursive' }}
			>
				<div className="row">
					<div className="col-md-3" style={{ textAlign: 'center' }}>
						{loading ? (
							<Spinner />
						) : profile == null ? (
							<>
								<p> Profile Not loaded </p>
								<p>
									Profile not created?{' '}
									<Link to="/createProfile">
										Create Profile
									</Link>
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
										<Button
											variant="contained"
											color="primary"
										>
											View Profile
										</Button>
									</Link>
								</p>
							</>
						)}
					</div>
					<div
						className="col-md-8"
						style={{ border: '1px solid black' }}
					>
						<p>Posts display section</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Home.propTypes = {
	auth: PropTypes.object,
	profile: PropTypes.object,
	logout: PropTypes.func.isRequired,
	getMyProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});
export default connect(mapStateToProps, { logout, getMyProfile })(Home);
