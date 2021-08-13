import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import Dropdown from '../Dropdown';

const Navbar: React.FC = () => {
    const { logout } = useActions();
    const { user } = useTypedSelector((state) => state.authentication);

    console.log('USER', user);

    return (
        <Container>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <div>You logged !</div>
                    <h1>Logged as:{user.email} </h1>
                    <button type="button" onClick={logout}>
                        Logout
                    </button>
                    {/* {user.has_communities && (
                        <Dropdown
                            communitiesCreator={user.communities.creator}
                            communitiesMember={user.communities.member}
                        >
                            My Communities
                        </Dropdown>
                    )} */}
                    {/* <Link to="/create_community">Create new community</Link> */}
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
