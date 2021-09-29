import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import styled from 'styled-components';

type LoadingProps = {
    size?: string | number;
    thickness?: number;
    modal?: boolean;
};

const Loading: React.FC<LoadingProps> = ({ size, thickness, modal }: LoadingProps): JSX.Element => {
    return (
        <>
            <LoadingContainer modal={modal}>
                <CircularProgress size={size} thickness={thickness} style={{ color: 'yellow' }} />
            </LoadingContainer>
        </>
    );
};

export default Loading;

type LoadingContainerProps = {
    modal?: boolean;
};

const LoadingContainer = styled.div<LoadingContainerProps>`
    position: ${({ modal }) => (modal ? 'absolute' : 'relative')};
    background: ${({ modal }) => (modal ? 'rgba(0, 0, 0, 0.6)' : 'none')};
    height: ${({ modal }) => (modal ? '100%' : '100vh')};
    width: ${({ modal }) => (modal ? '100%' : '100vw')};
    top: ${({ modal }) => modal && '0'};
    left: ${({ modal }) => modal && '0'};
    z-index: ${({ modal }) => modal && '20'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;
