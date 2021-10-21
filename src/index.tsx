import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmailConfirmation from 'pages/authentications/EmailConfirmation';
import React from 'react';
import './i18n';
// import LogRocket from 'logrocket';
// LogRocket.init('jhe5a4/dan');

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/confirmation">
                    <EmailConfirmation />
                </Route>
                <App />
            </Switch>
        </Router>
    </Provider>,

    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
