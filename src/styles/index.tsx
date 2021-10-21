import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`;

type ContentContainerProps = {
    marginRight?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    direction?: string;
    color?: string;
    alignItems?: string;
    grow?: number;
};

export const ContentContainer = styled.div<ContentContainerProps>`
    margin-right: ${({ marginRight }) => marginRight && marginRight};
    margin-left: ${({ marginLeft }) => marginLeft && marginLeft};
    margin-top: ${({ marginTop }) => marginTop && marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom && marginBottom};
    display: flex;

    flex-direction: ${({ direction }) => (direction ? direction : `column`)};
    background-color: ${({ color }) => `${color}`};
    justify-content: space-evenly;
    flex-grow: ${({ grow }) => grow && grow};
`;

type MainCardProps = {
    center?: boolean;
    minHeight?: string;
    minWidth?: string;
    grow?: number;
};

export const MainCard = styled.div<MainCardProps>`
    min-height: ${({ minHeight }) => minHeight && minHeight};
    min-width: ${({ minWidth }) => minWidth && minWidth};
    box-shadow: 3px 3px;
    border-radius: 15px;
    padding-bottom: 10px;
    background-color: #b36d72;
    transition: all 3s ease-in ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: ${({ center }) => center && `center`};
    flex-grow: ${({ grow }) => grow && grow};
`;

type Button = {
    active?: boolean;
    margin?: string;
};

export const Button = styled.button<Button>`
    color: ${({ active }) => !active && '#666666'};
    background-color: ${({ active }) => !active && '#cccccc'};
    border: ${({ active }) => !active && '1px solid #999999'};
    margin: ${({ margin }) => margin && margin};
    &:hover {
        cursor: pointer;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-evenly;
    align-items: center;
`;

export const MessageContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    width: 100%;
`;
