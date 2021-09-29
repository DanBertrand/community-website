import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EmailConfirmation from './pages/authentications/EmailConfirmation';

ReactDOM.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        {/* <Suspense fallback={<Loading size={'5em'} />}> */}
        <Router>
            <Switch>
                <Route path="/confirmation">
                    <EmailConfirmation />
                </Route>
                <App />
            </Switch>
        </Router>
        {/* </Suspense> */}
        {/* </React.StrictMode> */}
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
