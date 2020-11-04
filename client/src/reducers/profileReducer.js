import { CREATE_PROFILE, CREATE_PROFILE_FAILURE } from '../actions/types';

const initialState = {
	profile: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CREATE_PROFILE:
			return {
				profile: payload.profile,
			};
		case CREATE_PROFILE_FAILURE:
			return {
				profile: null,
			};
		default:
			return state;
	}
}
