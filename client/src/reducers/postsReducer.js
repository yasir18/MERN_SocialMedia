import {
	POST_ERROR,
	POSTS_FETCH_ERROR,
	CREATE_POST,
	GET_ALL_POSTS,
} from '../actions/types';

const initialState = {
	post: null,
	posts: [],
	loading: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_ALL_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case CREATE_POST:
			//console.log(payload);
			return {
				...state,
				posts: [payload, ...state.posts],
				loading: false,
			};

		case POSTS_FETCH_ERROR:
			return {
				...state,
				posts: [],
				loading: false,
			};
		default:
			return state;
	}
}
