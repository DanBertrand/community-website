import styled from 'styled-components';
import BackgroundImage from '../assets/images/main-image.jpg';

const AppBackground = styled.img`
    position: fixed;
    overflow-y: auto;
    z-index: -100;
    background-image: url(${BackgroundImage});
    /* background-position: center; */
    alt: 'background image';
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat;
    object-position: 100% -100%;
`;

export default AppBackground;
