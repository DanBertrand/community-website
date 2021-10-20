import React from 'react';
import styled from 'styled-components';
import { useActions } from 'hooks';
import { Message } from 'store/reducers/messagesReducer';

const FlashMessage: React.FC<Message> = ({ content, color }: Message) => {
    const { removeMessage } = useActions();

    React.useEffect(() => {
        setTimeout(() => {
            removeMessage(content);
        }, 4000);
    }, []);

    return (
        <StyledMessage onClick={() => removeMessage(content)} color={color} className="FlashMessage">
            <span>{content}</span>
        </StyledMessage>
    );
};

export default FlashMessage;

type StyledMessageProps = {
    color: string;
};

const StyledMessage = styled.div<StyledMessageProps>`
    background-color: ${({ color }) => color};
    display: flex;
    font-size: 1em;
    flex-grow: 1;
    min-height: 60px;
    align-items: center;
    margin-bottom: 0.2em;
    padding: 5px;
    box-shadow: 5px 5px 5px black;
    &:hover {
        cursor: pointer;
    }
`;
