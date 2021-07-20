import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../stores/index';

const Navbar: React.FC = () => {
    const user = useSelector((state: StoreStateType) => state.auth);
    return <Container>{user.isLogged ? <div>You logged !</div> : <button>Login</button>}</Container>;
};

export default Navbar;

const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: dodgerblue;
    display: flex;
    align-items: center;
`;
