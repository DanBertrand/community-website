import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
// import styled from 'styled-components';
// import mainImage from './assets/images/main-image.jpg';
import Register from './pages/authentications/Register';
import Home from './pages/Home';
import { StoreStateType } from './stores/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/authentications/Login';

const App: React.FC = () => {
    const state = useSelector((state: StoreStateType) => state.auth);
    console.log('Store', state);

    return (
        <Router>
            <Navbar />
            <Home />
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
