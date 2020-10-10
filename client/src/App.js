import React, { Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import Alert from './components/Alert';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Alert />
				<Switch>
					<Route path="/" component={Login} exact />
					<Route path="/register" component={Register} />
					<Route path="/home" component={Home} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
