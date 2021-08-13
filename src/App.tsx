import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Register from './pages/authentications/Register';
import Home from './pages/home';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/authentications/Login';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/themes';
import CreateCommunity from './pages/CreateCommunity';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import PublicRoute from './components/route/PublicRoute';
import PrivateRoute from './components/route/PrivateRoute';
import Community from './pages/Community';

const App: React.FC = () => {
    const { loadUser, loadCommunities } = useActions();
    const { user } = useTypedSelector((state) => state.authentication);
    const { communities } = useTypedSelector((state) => state.communities);

    useEffect(() => {
        if (!user) {
            loadUser();
        }
    }, []);

    useEffect(() => {
        if (user && user.has_communities) {
            console.log('COUCOU');
            loadCommunities();
        }
    }, [user]);

    console.log('USER', user);
    console.log('COMMUNITIES', communities);

    return (
        <ThemeProvider theme={lightTheme}>
            <Router>
                <Navbar />
                <Switch>
                    <PublicRoute restricted={false} user={user} component={Home} path="/" exact />
                    <PublicRoute restricted={true} user={user} component={Register} path="/register" exact />
                    <PublicRoute restricted={true} user={user} component={Login} path="/login" exact />
                    <PublicRoute restricted={true} user={user} component={Community} path="/community/:id" />
                    <PrivateRoute
                        restricted={false}
                        user={user}
                        component={CreateCommunity}
                        path="/new_community"
                        exact
                    />
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

// const Container = styled.div`
//     background: url(${mainImage});
//     width: 100%;
//     height: 100%;
// `;

export default App;
