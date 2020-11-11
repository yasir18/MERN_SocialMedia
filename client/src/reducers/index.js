import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import profile from './profileReducer';
import posts from './postsReducer';

export default combineReducers({
	auth,
	alert,
	profile,
	posts,
});
