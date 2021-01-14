import {
	POST_ERROR,
	POSTS_FETCH_ERROR,
	CREATE_POST,
	GET_ALL_POSTS,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
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
			'/api/posts/createPost',
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

		const resp = await axios.get('/api/posts/getAllPosts', config);
		// console.log(resp.data);
		dispatch({
			type: GET_ALL_POSTS,
			payload: resp.data,
		});
	} catch (err) {
		try {
			console.log(err);
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

export const likePost = (postId, userId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.token,
			},
		};

		await axios.post(`/api/posts/like/${postId}`, {}, config);
		const payload = {
			postId,
			userId,
		};
		dispatch({
			type: LIKE_POST,
			payload: payload,
		});
	} catch (err) {
		try {
			console.log(err.response.status);
			if (err.response.status !== 409) {
				const errors = err.response.data.errors;
				if (errors) {
					errors.forEach((error) =>
						dispatch(setAlert(error.msg, 'danger'))
					);
				}
			}
		} catch (err) {
			dispatch(setAlert('Unhandled', 'danger'));
		}
	}
};

export const unlikePost = (postId, userId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'content-Type': 'application/json',
				'auth-token': localStorage.token,
			},
		};

		await axios.post(`/api/posts/unlike/${postId}`, {}, config);
		const payload = {
			postId,
			userId,
		};
		dispatch({
			type: UNLIKE_POST,
			payload: payload,
		});
	} catch (err) {
		try {
			console.log(err.response.status);
			if (err.response.status !== 409) {
				const errors = err.response.data.errors;
				if (errors) {
					errors.forEach((error) =>
						dispatch(setAlert(error.msg, 'danger'))
					);
				}
			}
		} catch (err) {
			dispatch(setAlert('Unhandled', 'danger'));
		}
	}
};

export const deletePost = (postId) => async (dispatch) => {
	try {
		console.log('inside deletepost postId' + postId);
		const config = {
			headers: {
				'content-Type': 'application/json',
				'auth-token': localStorage.token,
			},
		};

		await axios.delete(`/api/posts/delete/${postId}`, config);
		const payload = {
			postId,
		};
		dispatch({
			type: DELETE_POST,
			payload: payload,
		});
	} catch (err) {
		try {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, 'danger'))
				);
			}
		} catch (err) {
			dispatch(setAlert('Unhandled', 'danger'));
		}
	}
};
