import {
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	LOGOUT,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				token: payload.token,
				loading: false,
				user: payload.user._id,
				isAuthenticated: true,
			};

		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				loading: false,
				user: null,
				isAuthenticated: null,
			};
		default:
			return state;
	}
}
