import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/layout/Navbar';
// import styled from 'styled-components';
// import mainImage from './assets/images/main-image.jpg';
import Register from './pages/authentications/Register';
import Home from './pages/Home';
import { StoreStateType } from './stores/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/authentications/Login';
import Cookies from 'js-cookie';
import { fetchCurrentUser } from './stores/authentication/authMiddleware';
import FlashMessage from './components/layout/FlashMessages';

const App: React.FC = () => {
    const { isLogged } = useSelector((state: StoreStateType) => state.auth);
    const flash = useSelector((state: StoreStateType) => state.flash);
    const dispatch = useDispatch();

    const autoLogin = async () => {
        const token = Cookies.get('token');

        if (!isLogged && token) {
            dispatch(fetchCurrentUser(token));
        }
    };
    console.log('FLASH STORE', flash);

    useEffect(() => {
        autoLogin();
    }, [isLogged]);

    return (
        <Router>
            <Navbar />
            <FlashMessage />
            <Route path="/" exact>
                <Home />
            </Route>
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
};

// const Container = styled.div`
//     background: url(${mainImage});
//     width: 100%;
//     height: 100%;
// `;

export default App;
