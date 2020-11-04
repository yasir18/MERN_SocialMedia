import { CREATE_PROFILE, CREATE_PROFILE_FAILURE } from './types';
import { setAlert } from '../actions/alert';
import axios from 'axios';

export const createProfile = (formdata) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'auth-token': localStorage.getItem('token'),
			},
		};

		const resp = await axios.post(
			'http://localhost:5000/api/profile/createProfile',
			formdata,
			config
		);
		dispatch({
			type: CREATE_PROFILE,
			payload: resp.data,
		});
		dispatch(setAlert('Profile Created', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: CREATE_PROFILE_FAILURE,
		});
	}
};
