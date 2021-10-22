import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useActions } from 'hooks/useActions';
import { useTranslation } from 'react-i18next';
import { Dropdown, Option } from '../Dropdown';
import { UserType } from 'store/types';
import StyledLink from '../StyledLink';
import { UserCommunity } from 'store/types/communitiesTypes';
import LanguageSwitcher from 'components/LanguageSwitcher';
// import { GiHamburgerMenu } from 'react-icons/gi';

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
    const { t } = useTranslation('navbar');

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
            <StyledLink to="/">{t('home')}</StyledLink>
            {user ? (
                <>
                    <span>Logged as:{user.email} </span>
                    <StyledLink to="/my_account">{t('my_account')}</StyledLink>
                    <StyledLink onClick={handleLogout} to="/">
                        {t('logout')}
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
                    <StyledLink to="/new_community">{t('create_community')}</StyledLink>
                </>
            ) : (
                <>
                    <StyledLink to="/login">{t('login')}</StyledLink>
                    <StyledLink to="/register">{t('register')}</StyledLink>
                </>
            )}
            <LanguageSwitcher />
        </Container>
    );
};

export default Navbar;

type ContainerProps = {
    scrollPosition: number;
};

const Container = styled.div<ContainerProps>`
    transition: all 3s ease-in ease-in-out;
    top: 0;
    width: 100%;
    background-color: #424949;
    transition: all 0.7s ease-in;
    box-shadow: ${({ scrollPosition }) => (scrollPosition < 20 ? 'none' : '0px 3px  #F8C471 ')};
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 10;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;
