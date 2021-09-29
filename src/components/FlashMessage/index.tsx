import React from 'react';
import { MessageStateType } from 'store/reducers/messagesReducer';
import styled from 'styled-components';
import { useActions } from 'hooks';

type FlashMessageProps = MessageStateType;

const FlashMessage: React.FC<FlashMessageProps> = ({ color, message }: FlashMessageProps) => {
    const { removeMessage } = useActions();

    console.log('MESSAGE', message);

    setTimeout(() => {
        removeMessage();
    }, 3000);

    return (
        <StyledMessage color={color} className="FlashMessage">
            <span>{message}</span>
        </StyledMessage>
    );
};

export default FlashMessage;

type StyledMessageProps = {
    color: string;
};

const StyledMessage = styled.div<StyledMessageProps>`
    background-color: ${({ color }) => color};
    /* padding-top: 80px; */
    font-size: large;
    width: 100%;
    position: sticky;
    top: 0;

    left: 0;
    z-index: 3;
`;
