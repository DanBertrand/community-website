import styled from 'styled-components';

export const PageContainer = styled.div`
    position: absolute;
    top: 55px;
    display: flex;
    width: 100%;
    /* align-items: center;
    justify-content: center; */
    /* flex-grow: 1; */
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
    margin-right: ${({ marginRight }) => `${marginRight}%`};
    margin-left: ${({ marginLeft }) => `${marginLeft}%`};
    margin-top: ${({ marginTop }) => `${marginTop}%`};
    margin-bottom: ${({ marginBottom }) => `${marginBottom}%`};
    display: flex;
    flex-direction: ${({ direction }) => (direction ? direction : `column`)};
    background-color: ${({ color }) => `${color}`};
    justify-content: space-evenly;
    /* align-items: ${({ alignItems }) => alignItems && alignItems}; */
    flex-grow: ${({ grow }) => (grow ? grow : 1)};
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
    /* max-height: 800px;
    overflow-y: scroll; */
    background-color: #b36d72;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: ${({ center }) => center && `center`};
    flex-grow: 1;
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
