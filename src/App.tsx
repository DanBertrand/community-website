import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/home/Home';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/global';
import { theme } from './styles/theme';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import PublicRoute from './components/route/PublicRoute';
import PrivateRoute from './components/route/PrivateRoute';
import { PageContainer } from './styles';
import Loading from './components/Loading';
const Register = React.lazy(() => import('./pages/authentications/Register'));
const Login = React.lazy(() => import('./pages/authentications/Login'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const CreateCommunity = React.lazy(() => import('./pages/CreateCommunity'));
const Community = React.lazy(() => import('./pages/community/Community'));
import EmailConfirmation from './pages/authentications/EmailConfirmation';
import Modal from './components/Modal';
import FlashMessage from './components/FlashMessage';
const { Suspense, useEffect } = React;

const App: React.FC = () => {
    const { autoLogin, loadCommunities } = useActions();
    const { user } = useTypedSelector((state) => state.authentication);
    const { communities } = useTypedSelector((state) => state.communities);
    const { message, color } = useTypedSelector((state) => state.message);
    const API_URL = process.env.REACT_APP_API_URL;

    console.log('*******************************************');
    console.log(message);
    console.log('*******************************************');

    useEffect(() => {
        if (!user) {
            autoLogin();
        }
        console.log('APP LOADED');
    }, []);

    useEffect(() => {
        if (user && user.has_communities) {
            loadCommunities();
        }
    }, [user]);

    console.log('user', user);
    console.log('user CONFIRMED AT', user?.confirmed_at);
    console.log('communities', communities);

    const resendEmail = async () => {
        console.log('Resend Email');

        const response = await fetch(`${API_URL}/user/confirmation/request_new_link/${user?.confirmation_token}`, {
            method: 'GET',
        });
        console.log(response);
        const data = await response.json();
        console.log('response USER', data.data);
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Suspense fallback={<Loading size={'5em'} />}>
                <Router>
                    <Navbar user={user} communities={communities} />

                    {message && <FlashMessage color={color} message={message} />}

                    <Switch>
                        <PageContainer>
                            <PublicRoute restricted={false} user={user} component={Home} path="/" exact />
                            <Route exact path="/confirmation/">
                                <EmailConfirmation />
                            </Route>
                            {user && !user.confirmed_at ? (
                                <Modal>
                                    <h1>Please confirm your email</h1>
                                    <p>
                                        An email has been sent to {user.email}. Click in the link to confirm your email.
                                    </p>

                                    <input type="button" value="Resend confirmation email" onClick={resendEmail} />
                                </Modal>
                            ) : (
                                <>
                                    <PublicRoute
                                        restricted={false}
                                        user={user}
                                        component={Community}
                                        path="/communities/:id"
                                    />
                                    <PublicRoute
                                        restricted={false}
                                        user={user}
                                        component={EmailConfirmation}
                                        path="/confirmation/"
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
                                                component={CreateCommunity}
                                                path="/new_community"
                                                exact
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </PageContainer>
                    </Switch>
                </Router>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
