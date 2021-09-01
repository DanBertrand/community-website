import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { ModalWrapper } from '../styles';

type LoadingProps = {
    size?: string | number;
    thickness?: number;
    modal?: boolean;
};

const Loading: React.FC<LoadingProps> = ({ size, thickness, modal }: LoadingProps) => {
    return modal ? (
        <ModalWrapper>
            <LoadingContainer>
                <CircularProgress size={size} thickness={thickness} style={{ color: 'yellow' }} />
            </LoadingContainer>
        </ModalWrapper>
    ) : (
        <LoadingContainer>
            <CircularProgress size={size} thickness={thickness} style={{ color: 'yellow' }} />
        </LoadingContainer>
    );
};

export default Loading;

type LoadingContainerProps = {
    modal?: boolean;
};

const LoadingContainer = styled.div<LoadingContainerProps>`
    /* position: ${({ modal }) => (modal ? 'absolute' : 'relative')};
    background: ${({ modal }) => (modal ? 'rgba(0, 0, 0, 0.6)' : 'none')}; */
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

// const StyledModal = styled.div`
//     position: absolute;
//     background: rgba(179, 174, 109, 1);
//     min-height: 200px;
//     height: 25%;
//     width: 25%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;

// const ModalWrapper = styled.div`
//     position: absolute;
//     background: rgba(0, 0, 0, 0.6);
//     top: 0;
//     left: 0;
//     height: 100%;
//     width: 100%;
//     display: flex;
//     align-items: center;
// `;
