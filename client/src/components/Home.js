import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
const Home = (props) => {
	return (
		<div>
			{props.auth.loading ? <span>Spinner</span> : <span>Home Page</span>}
			<div>
				<button onClick={() => props.logout()}>Log out</button>
			</div>
		</div>
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
