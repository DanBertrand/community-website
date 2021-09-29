import React from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';

type EditIconProps = IconStyleProps & {
    size?: number;
    onClick: () => void;
};

const EditIcon: React.FC<EditIconProps> = ({ size = 24, onClick, active, marginTop, marginRight }: EditIconProps) => {
    return (
        <IconContainer>
            <IconStyle
                active={active}
                marginTop={marginTop}
                marginRight={marginRight}
                onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    onClick();
                }}
            >
                <BiEdit size={size} />
            </IconStyle>
        </IconContainer>
    );
};

export default EditIcon;

type IconStyleProps = {
    active?: boolean;
    marginTop?: number;
    marginRight?: number;
};

const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    /* flex-grow: 1; */
`;

const IconStyle = styled.div<IconStyleProps>`
    color: ${({ active }) => (active ? 'white' : 'black')};
    margin-right: ${({ marginRight }) => `${marginRight}px`};
    margin-top: ${({ marginTop }) => `${marginTop}px`};
    &:hover {
        cursor: pointer;
        color: ${({ active }) => (active ? 'black' : 'white')};
    }
`;
