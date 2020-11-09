import {
	CREATE_PROFILE,
	CREATE_PROFILE_FAILURE,
	PROFILE_ERROR,
	PROFILE_LOADED,
	PROFILE_UPDATE,
	CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
	profile: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CREATE_PROFILE:
			return {
				profile: payload.profile,
				loading: false,
			};
		case PROFILE_UPDATE:
			//console.log(payload);
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case PROFILE_LOADED:
			//console.log(payload);
			return {
				profile: payload,
				loading: false,
			};
		case PROFILE_ERROR:
		case CREATE_PROFILE_FAILURE:
			return {
				profile: null,
				loading: false,
			};
		case CLEAR_PROFILE:
			return {
				profile: null,
				loading: true,
			};
		default:
			return state;
	}
}
