import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];
//{ id, msg, type}

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case REMOVE_ALERT:
			let filteredAlerts = state.filter((x) => x.id !== payload.id);
			return filteredAlerts;
		default:
			return state;
	}
}
