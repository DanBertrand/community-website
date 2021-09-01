import React from 'react';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';

type EditIconProps = IconStyleProps & {
    size?: number;
    onClick: () => void;
};

const EditIcon: React.FC<EditIconProps> = ({ size = 24, onClick, marginTop, marginRight }: EditIconProps) => {
    return (
        <IconContainer>
            <IconStyle
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
    margin-right: ${({ marginRight }) => `${marginRight}px`};
    margin-top: ${({ marginTop }) => `${marginTop}px`};
    &:hover {
        color: white;
        cursor: pointer;
    }
`;
