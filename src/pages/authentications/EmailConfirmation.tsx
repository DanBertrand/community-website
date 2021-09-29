import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';

const EmailConfirmation = (): JSX.Element => {
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const [didFetch, setDidFetch] = React.useState(false);
    const history = useHistory();
    const location = useLocation();
    const confirmationToken = location.search.split('=').pop();

    const API_VERSION_URL = process.env.REACT_APP_API_VERSION_URL;
    const HOST_URL = process.env.REACT_APP_HOST_URL;
    const API_URL = `${HOST_URL}${API_VERSION_URL}`;

    const resendEmail = async () => {
        console.log('Resend Email');
        const response = await fetch(`${API_URL}/user/confirmation/request_new_link/${confirmationToken}`, {
            method: 'GET',
        });
        console.log(response);
        const data = await response.json();
        console.log('response USER', data.data);
    };

    React.useEffect(() => {
        const confirmToken = async () => {
            const resp = await fetch(`${HOST_URL}/confirmation?confirmation_token=${confirmationToken}`);
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
        confirmToken();
    }, []);

    if (!didFetch) {
        return <Loading />;
    } else {
        return (
            <Modal>
                <h2>
                    {message && message}
                    {error && error}
                </h2>
                <p> You can request a new confirmation link</p>

                <button type="button" onClick={resendEmail}>
                    Resend Email
                </button>
            </Modal>
        );
    }
};

export default EmailConfirmation;
