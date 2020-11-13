import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileSection from './ProfileSection';
import PostsSection from './PostsSection';

const Home = (props) => {
	console.log(
		'Home Render with isAuthenticated value ' + props.auth.isAuthenticated
	);
	return (
		<Fragment>
			<div
				className="container"
				style={{ margin: '20px 0px', fontFamily: 'cursive' }}
			>
				<div className="row">
					<div className="col-md-3" style={{ textAlign: 'center' }}>
						<ProfileSection />
					</div>
					<div
						className="col-md-8"
						style={{ border: '1px solid black' }}
					>
						<PostsSection />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Home.propTypes = {
	auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(Home);
