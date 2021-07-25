import React from 'react';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../stores';
import styled from 'styled-components';

const FlashMessage: React.FC = () => {
    const state = useSelector((state: StoreStateType) => state.flash);
    const { color, content, display } = state;

    return display ? <FlashStyled color={color}>{content}</FlashStyled> : null;
};

export default FlashMessage;

interface FlashStyledProps {
    color: string;
}

const FlashStyled = styled.div<FlashStyledProps>`
    width: 100%;
    background-color: ${({ color }) => color};
`;
