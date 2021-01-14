import {
	CREATE_PROFILE,
	CREATE_PROFILE_FAILURE,
	PROFILE_ERROR,
	PROFILE_LOADED,
	PROFILE_UPDATE,
	CLEAR_PROFILE,
} from './types';
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
			'/api/profile/createProfile',
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

export const getMyProfile = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.token,
			},
		};

		const resp = await axios.get('/api/profile/getMyProfile', config);
		// console.log(resp.data);
		dispatch({
			type: PROFILE_LOADED,
			payload: resp.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

export const getProfileByUserId = (id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.token,
			},
		};

		const resp = await axios.get(
			`/api/profile/getProfileByUserId/${id}`,
			config
		);
		// console.log(resp.data);
		dispatch({
			type: PROFILE_LOADED,
			payload: resp.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

export const editProfile = (formdata) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'auth-token': localStorage.getItem('token'),
			},
		};

		const resp = await axios.put(
			'/api/profile/editProfile',
			formdata,
			config
		);
		dispatch({
			type: PROFILE_UPDATE,
			payload: resp.data,
		});
		dispatch(setAlert('Profile Updated', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
		});
	}
};

export const clearProfile = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
};
