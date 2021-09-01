import styled from 'styled-components';
import BackgroundImage from '../assets/images/main-image.jpg';

export const AppBackground = styled.img`
    position: fixed;
    overflow-y: auto;
    z-index: -100;
    background-image: url(${BackgroundImage});
    /* background-position: center; */
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat;
    object-position: 100% -100%;
`;
export const PageContainer = styled.div`
    padding-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

type ContentContainerProps = {
    marginRight?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    direction?: string;
    color?: string;
};

export const ContentContainer = styled.div<ContentContainerProps>`
    margin-right: ${({ marginRight }) => `${marginRight}%`};
    margin-left: ${({ marginLeft }) => `${marginLeft}%`};
    margin-top: ${({ marginTop }) => `${marginTop}%`};
    margin-bottom: ${({ marginBottom }) => `${marginBottom}%`};
    display: flex;
    flex-direction: ${({ direction }) => (direction ? `${direction}` : `column`)};
    background-color: ${({ color }) => `${color}`};
    justify-content: space-evenly;
    /* align-items: center; */
    flex-grow: 1;
`;

type MainCardProps = {
    center?: boolean;
};

export const MainCard = styled.div<MainCardProps>`
    min-height: 200px;
    min-width: 200px;
    box-shadow: 3px 3px;
    border-radius: 15px;
    padding-bottom: 10px;
    /* margin: 30px 30px 30px 30px; */
    background-color: #b36d72;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: ${({ center }) => center && `center`};
    flex-grow: 1;
`;

type Button = {
    active?: boolean;
};

export const Button = styled.button<Button>`
    color: ${({ active }) => !active && '#666666'};
    background-color: ${({ active }) => !active && '#cccccc'};
    border: ${({ active }) => !active && '1px solid #999999'};
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-evenly;
    align-items: center;
`;

export const ModalWrapper = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
