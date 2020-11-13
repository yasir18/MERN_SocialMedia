import {
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGOUT,
	USER_LOADED,
	AUTH_ERROR,
} from './types';
import { setAlert } from '../actions/alert';
import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = { username, password };
		const resp = await axios.post(
			'http://localhost:5000/api/user/login',
			body,
			config
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: resp.data,
		});
		dispatch(setAlert('Login Success', 'success'));
	} catch (err) {
		try {
			const errors = err.response.data.errors;
			//In future, change error.msg to error.message because if there is problem with server, error will be filled in message field
			//To use error.message, need to change all server side error patterns
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, 'danger'))
				);
			}
			dispatch({
				type: LOGIN_FAIL,
			});
		} catch (err) {
			dispatch(setAlert('Unhandled', 'danger'));
		}
	}
};

export const register = (username, password) => async (dispatch) => {
	try {
		const body = { username, password };
		const resp = await axios.post(
			'http://localhost:5000/api/user/register',
			body
		);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: resp.data,
		});
		dispatch(setAlert('Register Success', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

export const loadUser = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.token,
			},
		};
		const resp = await axios.get('http://localhost:5000/api/user', config);
		dispatch({
			type: USER_LOADED,
			payload: resp.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const logout = () => async (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
	dispatch(setAlert('Logged out', 'success'));
};
