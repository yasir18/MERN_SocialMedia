import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = (props) => {
	const alerts = props.alert;
	console.log(alerts);
	return (
		<div>
			{alerts.length > 0 &&
				alerts.map((alert) => {
					if (alert.type === 'danger') {
						return (
							<div
								className="alert alert-danger"
								key={alert.id}
								role="alert"
							>
								{alert.message}
							</div>
						);
					} else {
						return (
							<div
								className="alert alert-success"
								key={alert.id}
								role="alert"
							>
								{alert.message}
							</div>
						);
					}
				})}
		</div>
		// <div class="alert alert-primary" role="alert">
		// 	This is a primary alert—check it out!
		// </div>
	);
};

Alert.prototypes = {
	alert: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	alert: state.alert,
});
export default connect(mapStateToProps)(Alert);
