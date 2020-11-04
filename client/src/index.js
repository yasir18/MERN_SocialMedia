import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
//Inorder to prevent component render twice, remove above line i.e, remove strict mode
// ReactDOM.render(<App />, document.getElementById('root'));
