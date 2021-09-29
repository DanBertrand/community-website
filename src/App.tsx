import React from 'react';
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
const { Suspense, useEffect, useState } = React;

const App: React.FC = () => {
    const { autoLogin, loadCommunities } = useActions();
    const { user } = useTypedSelector((state) => state.authentication);
    const { communities } = useTypedSelector((state) => state.communities);
    const { message, color } = useTypedSelector((state) => state.message);

    const [counter, setCounter] = useState(1);

    const API_VERSION_URL = process.env.REACT_APP_API_VERSION_URL;
    const HOST_URL = process.env.REACT_APP_HOST_URL;
    const API_URL = `${HOST_URL}${API_VERSION_URL}`;

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

    const resendEmail = async () => {
        console.log('Resend Email');

        const response = await fetch(`${API_URL}/user/confirmation/request_new_link/${user?.confirmation_token}`, {
            method: 'GET',
        });
        console.log(response);
        const data = await response.json();
        console.log('response USER', data.data);
    };

    console.log(`%c APP RENDERED : ${counter} times`, 'background: #222; color: #bada55');

    React.useEffect(() => {
        setCounter((prevCounter) => prevCounter + 1);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Suspense fallback={<Loading size={'5em'} />}>
                <Navbar user={user} communities={communities} />

                {message && <FlashMessage color={color} message={message} />}

                <PageContainer>
                    <PublicRoute restricted={false} user={user} component={Home} path="/" exact />

                    {user && !user.confirmed_at ? (
                        <Modal>
                            <h1>Please confirm your email</h1>
                            <p>An email has been sent to {user.email}. Click in the link to confirm your email.</p>

                            <input type="button" value="Resend confirmation email" onClick={resendEmail} />
                        </Modal>
                    ) : (
                        <>
                            <PublicRoute restricted={false} user={user} component={Community} path="/communities/:id" />
                            <PublicRoute
                                restricted={false}
                                user={user}
                                component={EmailConfirmation}
                                path="/confirmation/"
                            />
                            <PublicRoute restricted={true} user={user} component={Register} path="/register" exact />
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
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
