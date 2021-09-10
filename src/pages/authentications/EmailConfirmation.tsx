import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import { UserType } from '../../redux/types';

const EmailConfirmation = (): JSX.Element => {
    const [message, setMessage] = React.useState('');
    const [user, setUser] = React.useState<UserType>();
    const [error, setError] = React.useState('');
    const [didFetch, setDidFetch] = React.useState(false);
    const history = useHistory();
    const location = useLocation();
    const confirmationToken = location.search.split('=').pop();

    const confirmToken = async () => {
        const resp = await fetch(
            `http://localhost:8080/confirmation/confirmation?confirmation_token=${confirmationToken}`,
        );
        console.log(resp);
        if (resp.ok) {
            setTimeout(() => {
                history.push('/login');
            }, 3000);
        }
        const data = await resp.json();
        console.log('response token', data);
        const { message, error } = data;
        message && setMessage(message);
        error && setError(error);
        setDidFetch(true);
    };

    const getUserByConfirmationToken = async () => {
        const resp = await fetch(`http://localhost:8080/api/v1/user/confirmation_token/${confirmationToken}`);
        console.log(resp);

        const data = await resp.json();
        console.log('response USER', data.data);
        setUser(data.data);
    };

    console.log('User', user);

    const resendEmail = async () => {
        console.log('Resend Email');
        if (user) {
            const response = await fetch(
                `http://localhost:8080/api/v1/user/confirmation/request_new_link/${confirmationToken}`,
                {
                    method: 'GET',
                },
            );

            console.log(response);
            const data = await response.json();
            console.log('response USER', data.data);
        }
    };

    React.useEffect(() => {
        confirmToken();
    }, []);

    React.useEffect(() => {
        if (error) {
            getUserByConfirmationToken();
        }
    }, [error]);

    return (
        <Modal>
            <h2>
                {message && message}
                {error && error}
            </h2>
            {error && <p> You can request a new confirmation link</p>}
            {error && (
                <button type="button" onClick={resendEmail}>
                    Resend Email
                </button>
            )}
            {!didFetch && <Loading />}
        </Modal>
    );
};

export default EmailConfirmation;
