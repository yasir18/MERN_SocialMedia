import { Link } from '@material-ui/core';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { clearProfile } from '../../actions/profile';

const Navbar = (props) => {
	return (
		// <div style={{ width: '100%' }}>
		<nav className="navbar navbar-expand-sm  fixed-top  navbar-dark bg-dark">
			<Link
				href="/home"
				className="navbar-brand"
				style={{ color: 'white' }}
			>
				Socio-Connect
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div
				className="collapse navbar-collapse"
				id="navbarSupportedContent"
			>
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link href="/home" className="nav-link">
							Home <span className="sr-only">(current)</span>
						</Link>
					</li>
				</ul>
				{props.auth.isAuthenticated && (
					<button
						className="btn btn-outline-success my-2 my-sm-0"
						onClick={() => {
							props.logout();
							props.clearProfile();
						}}
						type="submit"
					>
						LogOut
					</button>
				)}
			</div>
		</nav>
		// </div>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object,
	logout: PropTypes.func.isRequired,
	clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout, clearProfile })(Navbar);
