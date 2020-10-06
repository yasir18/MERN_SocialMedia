import React, { Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<Fragment>Hello World</Fragment>
		</Provider>
	);
}

export default App;
