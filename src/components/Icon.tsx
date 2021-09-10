import React, { ReactElement } from 'react';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

type IconContainerProps = IconStyleProps & {
    size?: number;
    onClick: () => void;
    children?: IconType | Element | ReactElement<any, any>;
};

const Icon: React.FC<IconContainerProps> = ({
    onClick,
    active,
    marginTop,
    marginRight,
    children,
}: IconContainerProps) => {
    return (
        <IconContainer>
            <IconStyle
                active={active}
                onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    onClick();
                }}
                marginTop={marginTop}
                marginRight={marginRight}
            >
                {children}
            </IconStyle>
        </IconContainer>
    );
};
export default Icon;

type IconStyleProps = {
    active?: boolean;
    marginTop?: number;
    marginRight?: number;
};

const IconStyle = styled.div<IconStyleProps>`
    color: ${({ active }) => (active ? 'black' : 'black')};
    margin-right: ${({ marginRight }) => `${marginRight}px`};
    margin-top: ${({ marginTop }) => `${marginTop}px`};
    &:hover {
        cursor: pointer;
        color: ${({ active }) => (active ? 'red' : 'green')};
    }
`;
const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
    /* flex-grow: 1; */
`;
