import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { StoreStateType } from '../../stores/index';
import { Link } from 'react-router-dom';
import React from 'react';
import { fetchToLogout } from '../../stores/authentication/authMiddleware';

const Navbar: React.FC = () => {
    const { isLogged, token, email } = useSelector((state: StoreStateType) => state.auth);
    const dispatch = useDispatch();
    console.log('USER NAV BAR', isLogged);

    const handleLogout = () => {
        dispatch(fetchToLogout(token));
    };

    return (
        <Container>
            {isLogged ? (
                <>
                    <div>You logged !</div>
                    <h1>Logged as: {email}</h1>
                    <button type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </Container>
    );
};

export default Navbar;

const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: dodgerblue;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;
