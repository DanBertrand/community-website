import reportWebVitals from './reportWebVitals';
// import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
// import Loading from './components/Loading';
import App from './App';
// const App = React.lazy(() => import('./App'));

ReactDOM.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        {/* <Suspense fallback={<Loading size={'5em'} />}> */}
        <App />
        {/* </Suspense> */}
        {/* </React.StrictMode> */}
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
