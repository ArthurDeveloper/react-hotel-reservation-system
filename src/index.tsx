import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './containers/App';
import Backoffice from './containers/Backoffice';
import reportWebVitals from './reportWebVitals';
import store from './stores';

import './lib/styles/_reboot.css';
import './lib/styles/main.scss';

function render() {
	ReactDOM.render(
    	<React.StrictMode>
        	<BrowserRouter>
				<Routes>
					<Route path="/" element={<Provider store={store}>
            			<App />
        			</Provider>} />
					<Route path="/backoffice" element={<Backoffice />} />
				</Routes>
			</BrowserRouter>
    	</React.StrictMode>,
    	document.getElementById('root')
	);
}


render();


reportWebVitals();
