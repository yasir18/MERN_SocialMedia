import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../utils/Spinner';
import { getMyProfile } from '../../actions/profile';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
const styles = (theme) => ({
	tags: {
		color: '#a4b0be',
	},
	image: {
		width: '250px',
		height: '250px',
	},
	container: {
		fontFamily: 'cursive',
		marginTop: '30px',
	},
	row: {
		display: 'flex',
		justifyContent: 'center',
	},
	imageGrid: {
		textAlign: 'center',
		marginRight: '20px',
	},
});
const ProfileDisplay = (props) => {
	const {
		classes,
		profile: { profile, loading },
		getMyProfile,
	} = props;

	useEffect(() => {
		getMyProfile();
	}, [getMyProfile]);

	return (
		<div>
			<div className={`container ${classes.container}`}>
				<div className={`row ${classes.row}`}>
					{loading ? (
						<Spinner />
					) : (
						<>
							<div className={`col-md-4 ${classes.imageGrid}`}>
								<img
									src={profile.image}
									alt="name"
									className={classes.image}
								/>
							</div>
							<div className="col-md-8">
								<h3>{profile.fullName}</h3>
								<br />
								<p>
									<span className={classes.tags}>Bio: </span>
									{profile.bio}
								</p>
								<p>
									<span className={classes.tags}>City: </span>{' '}
									{profile.city}
								</p>
								<p>
									<span className={classes.tags}>
										Email:{' '}
									</span>
									{profile.email}
								</p>
								<Link to="/editProfile">
									<Button variant="contained" color="primary">
										Edit Profile
									</Button>
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getMyProfile })(
	withStyles(styles)(ProfileDisplay)
);
