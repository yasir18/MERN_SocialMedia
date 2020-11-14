import {
	POST_ERROR,
	POSTS_FETCH_ERROR,
	CREATE_POST,
	GET_ALL_POSTS,
	LIKE_POST,
	UNLIKE_POST,
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
		case POST_ERROR:
		case POSTS_FETCH_ERROR:
			return {
				...state,
				posts: [],
				loading: false,
			};
		case LIKE_POST: {
			let filteredPost = state.posts.filter((x) => {
				return x._id === payload.postId;
			});
			const user = { user: payload.userId };
			filteredPost[0].likes.push(user);
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? { ...filteredPost[0] } : post
				),
				loading: false,
			};
		}

		case UNLIKE_POST: {
			let filteredPost = state.posts.filter((x) => {
				return x._id === payload.postId;
			});
			filteredPost[0].likes = filteredPost[0].likes.filter((like) => {
				return like.user !== payload.userId;
			});
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId ? { ...filteredPost[0] } : post
				),
				loading: false,
			};
		}
		default:
			return state;
	}
}
