import {
	POST_ERROR,
	POSTS_FETCH_ERROR,
	CREATE_POST,
	GET_ALL_POSTS,
} from '../actions/types';
import { setAlert } from '../actions/alert';
import axios from 'axios';

export const createPost = (text) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.getItem('token'),
			},
		};
		const formData = {
			text,
		};
		const resp = await axios.post(
			'http://localhost:5000/api/posts/createPost',
			formData,
			config
		);
		dispatch({
			type: CREATE_POST,
			payload: resp.data,
		});
		dispatch(setAlert('Post Created', 'success'));
	} catch (err) {
		try {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, 'danger'))
				);
			}
			dispatch({
				type: POST_ERROR,
			});
		} catch (err) {
			dispatch(setAlert('Unhandled', 'danger'));
		}
	}
};

export const getAllPosts = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.token,
			},
		};

		const resp = await axios.get(
			'http://localhost:5000/api/posts/getAllPosts',
			config
		);
		// console.log(resp.data);
		dispatch({
			type: GET_ALL_POSTS,
			payload: resp.data,
		});
	} catch (err) {
		try {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, 'danger'))
				);
			}
			dispatch({
				type: POSTS_FETCH_ERROR,
			});
		} catch (err) {
			dispatch(setAlert('Unhandled', 'danger'));
		}
	}
};
