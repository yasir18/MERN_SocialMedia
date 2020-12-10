import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Alert from './components/utils/Alert';
import Navbar from './components/utils/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CreateProfile from './components/Profile/CreateProfile';
import ProfileDisplay from './components/Profile/ProfileDisplay';
import EditProfile from './components/Profile/EditProfile';
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
					<PrivateRoute
						exact
						path="/viewProfile/:id"
						component={ProfileDisplay}
					/>
					<PrivateRoute
						exact
						path="/editProfile"
						component={EditProfile}
					/>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
