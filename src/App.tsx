import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/home/Home';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/themes';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import PublicRoute from './components/route/PublicRoute';
import PrivateRoute from './components/route/PrivateRoute';
import styled from 'styled-components';
import TestProps from './components/TestProps';
import { PageContainer } from './styles';

// import Register from './pages/authentications/Register';
// import Login from './pages/authentications/Login';
// import Profile from './pages/Profile';
// import CreateCommunity from './pages/CreateCommunity';
// import Community from './pages/community/Community';

const Register = React.lazy(() => import('./pages/authentications/Register'));
const Login = React.lazy(() => import('./pages/authentications/Login'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const CreateCommunity = React.lazy(() => import('./pages/CreateCommunity'));
const Community = React.lazy(() => import('./pages/community/Community'));
import Loading from './components/Loading';

const App: React.FC = () => {
    const { autoLogin, loadCommunities } = useActions();
    const { user } = useTypedSelector((state) => state.authentication);
    const { communities } = useTypedSelector((state) => state.communities);

    useEffect(() => {
        if (!user) {
            autoLogin();
        }
    }, []);

    useEffect(() => {
        if (user && user.has_communities) {
            loadCommunities();
        }
    }, [user]);

    console.log('user', user);
    console.log('communities', communities);

    return (
        <ThemeProvider theme={lightTheme}>
            <Router>
                <AppWrapper>
                    {/* <AppBackground /> */}
                    <Navbar user={user} communities={communities} />
                    <Switch>
                        <PageContainer>
                            <PublicRoute restricted={false} user={user} component={Home} path="/" exact />
                            <Suspense fallback={<Loading />}>
                                <PublicRoute
                                    restricted={false}
                                    user={user}
                                    component={Community}
                                    path="/communities/:id"
                                />
                                <PublicRoute
                                    restricted={true}
                                    user={user}
                                    component={Register}
                                    path="/register"
                                    exact
                                />
                                <PublicRoute restricted={true} user={user} component={Login} path="/login" exact />

                                {user && (
                                    <>
                                        <PrivateRoute
                                            restricted={false}
                                            user={user}
                                            component={Profile}
                                            path="/my_account"
                                            exact
                                        />
                                        <PrivateRoute
                                            restricted={false}
                                            user={user}
                                            component={TestProps}
                                            path="/test"
                                            exact
                                        />
                                        <PrivateRoute
                                            restricted={false}
                                            user={user}
                                            component={CreateCommunity}
                                            path="/new_community"
                                            exact
                                        />
                                    </>
                                )}
                            </Suspense>
                        </PageContainer>
                    </Switch>
                </AppWrapper>
            </Router>
        </ThemeProvider>
    );
};

export default App;

const AppWrapper = styled.div`
    font-family: 'Oswald', sans-serif;
    height: 100%;
`;
