import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
//Inorder to prevent component render twice, remove above line i.e, remove strict mode
// ReactDOM.render(<App />, document.getElementById('root'));
