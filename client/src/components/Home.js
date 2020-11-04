import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Home = (props) => {
	console.log(
		'Home Render with isAuthenticated value ' + props.auth.isAuthenticated
	);
	return (
		<Fragment>
			<h2>Home page</h2>

			<Link to="/createProfile">
				<Button variant="contained" color="primary">
					createProfile
				</Button>
			</Link>
		</Fragment>
	);
};

Home.propTypes = {
	auth: PropTypes.object,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Home);
