import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { Dropdown, Option } from '../Dropdown';
import { UserType } from '../../redux/types';
import StyledLink from '../StyledLink';
import { UserCommunity } from '../../redux/types/communitiesTypes';

type NavbarProps = {
    user: UserType | null;
    communities: {
        count: number;
        data: UserCommunity[];
    } | null;
};

const Navbar: React.FC<NavbarProps> = ({ user, communities }: NavbarProps) => {
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const { logout, cleanCommunities } = useActions();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        cleanCommunities();
    };

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleSelect = (id: string) => {
        history.push(`/communities/${parseInt(id)}`);
    };

    const currentPath = history.location.pathname;
    const currentPathID = parseInt(currentPath.replace(/\D+/g, ''));

    return (
        <Container scrollPosition={scrollPosition}>
            <StyledLink to="/">Home</StyledLink>
            {user ? (
                <>
                    <span>Logged as:{user.email} </span>
                    <StyledLink to="/my_account">My Account</StyledLink>
                    <StyledLink onClick={handleLogout} to="/">
                        Logout
                    </StyledLink>

                    {communities?.data && communities?.data.length > 0 && (
                        <Dropdown handleSelect={handleSelect}>
                            {communities?.data?.map((community) => (
                                <Option
                                    key={community.id}
                                    value={community.id}
                                    label={community.name}
                                    currentPathID={currentPathID}
                                />
                            ))}
                        </Dropdown>
                    )}
                    <StyledLink to="/new_community">Create Community</StyledLink>
                </>
            ) : (
                <>
                    <StyledLink to="/login">Login</StyledLink>
                    <StyledLink to="/register">Register</StyledLink>
                </>
            )}
        </Container>
    );
};

export default Navbar;

type ContainerProps = {
    scrollPosition: number;
};

const Container = styled.div<ContainerProps>`
    position: fixed;
    width: 100%;
    height: 80px;
    background-color: #b3ae6d;
    box-shadow: ${({ scrollPosition }) => (scrollPosition < 20 ? 'none' : '0px 3px  #b38b6d')};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 10;
`;
