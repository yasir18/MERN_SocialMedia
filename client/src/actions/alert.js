import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (message, type) => (dispatch) => {
	const payload = {
		id: uuidv4(),
		message,
		type,
	};
	dispatch({
		type: SET_ALERT,
		payload,
	});

	setTimeout(() => {
		dispatch({
			type: REMOVE_ALERT,
			payload,
		});
	}, 3000);
};
