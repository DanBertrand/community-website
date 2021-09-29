import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import useFetch from '../../hooks/useFetch';

const EmailConfirmation = (): JSX.Element => {
    const history = useHistory();
    const location = useLocation();
    const [counter, setCounter] = React.useState(4);
    const { state, confirmToken, resendConfirmationEmail } = useFetch();
    const { isLoading, error, message } = state;
    const confirmationToken = location.search.split('=').pop();

    const callback = () => {
        setTimeout(() => {
            history.push('/login');
        }, 4000);
    };

    const resendEmail = async () => {
        setCounter(4);
        resendConfirmationEmail(`/user/confirmation/request_new_link/${confirmationToken}`, callback);
    };

    React.useEffect(() => {
        const timer = setInterval(() => setCounter((counter) => counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter, message]);

    React.useEffect(() => {
        confirmToken(`/confirmation?confirmation_token=${confirmationToken}`, callback);
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <Modal>
                <h2>
                    {message && message}
                    {error && error}
                </h2>
                <p> You can request a new confirmation link</p>
                {message ? (
                    <span>Redirect to login in {counter} </span>
                ) : (
                    <button type="button" onClick={resendEmail}>
                        Resend Email
                    </button>
                )}
            </Modal>
        );
    }
};

export default EmailConfirmation;
