import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateProfile from './components/CreateProfile';
import PrivateRoute from './components/PrivateRoute';
import { loadUser } from './actions/auth';

const App = () => {
	console.log('Inside App Render');
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navbar />
				<Alert />
				<Switch>
					<Route path="/" component={LandingPage} exact />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<PrivateRoute exact path="/home" component={Home} />
					<PrivateRoute
						exact
						path="/createProfile"
						component={CreateProfile}
					/>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
