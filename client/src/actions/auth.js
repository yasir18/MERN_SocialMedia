import { LOGIN_FAIL, LOGIN_SUCCESS } from './types.js';

export const Login = (username, password) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = { username, password };
		const resp = await axios.post('/api/user/login', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: resp.data,
		});
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};
