import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { useActions } from '../../hooks/useActions';
// import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Dropdown, Option } from '../Dropdown';
import { CommunityType, UserType } from '../../redux/types';

// import { Button } from '@material-ui/core';
import StyledLink from '../StyledLink';

type NavbarProps = {
    user: UserType | null;
    communities: {
        count: number;
        creator?: CommunityType[];
        member?: CommunityType[];
    } | null;
};

const Navbar: React.FC<NavbarProps> = ({ user, communities }: NavbarProps) => {
    const { logout } = useActions();
    // const { user } = useTypedSelector((state) => state.authentication);
    // const { communities } = useTypedSelector((state) => state.communities);
    const history = useHistory();

    const [scrollPosition, setScrollPosition] = React.useState(0);
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
    // const currentPathWithoutInteger = currentPath.replace(/[0-9]/g, '');

    const displayDropdown = (
        <Dropdown handleSelect={handleSelect}>
            {communities?.creator?.map((community) => (
                <Option key={community.id} value={community.id} label={community.name} currentPathID={currentPathID} />
            ))}
            {communities?.member?.map((community) => (
                <Option key={community.id} value={community.id} label={community.name} currentPathID={currentPathID} />
            ))}
        </Dropdown>
    );

    return (
        <Container scrollPosition={scrollPosition}>
            <StyledLink to="/">Home</StyledLink>
            {user ? (
                <>
                    <span>Logged as:{user.email} </span>
                    <StyledLink to="/my_account">My Account</StyledLink>
                    <StyledLink onClick={logout} to="/">
                        Logout
                    </StyledLink>

                    {communities && displayDropdown}
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
    /* background-color: #cacfd2; */
    background-color: #b3ae6d;
    box-shadow: ${({ scrollPosition }) => (scrollPosition < 20 ? 'none' : '0px 3px  #b38b6d')};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 999;
`;
