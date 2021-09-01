import reportWebVitals from './reportWebVitals';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppBackground } from './styles';
import { Provider } from 'react-redux';
import { store } from './redux';
import Loading from './components/Loading';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <AppBackground alt="background image" />
        <Suspense
            fallback={
                <div>
                    <Loading size={'5em'} />
                </div>
            }
        >
            <App />
        </Suspense>
        {/* </React.StrictMode> */}
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
