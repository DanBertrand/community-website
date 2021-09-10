import React from 'react';
import Avatar from '../../../../../components/Avatar';
import styled from 'styled-components';

type MemberLine = {
    avatar?: string;
    firstName: string;
    lastName: string;
    position: string;
    id?: number;
};

const MemberLine: React.FC<MemberLine> = ({ avatar, firstName, lastName, position }: MemberLine) => {
    console.log('AVATAR', avatar);
    return (
        <LineContainer templateColumns={'10% 40% 40% 10%'} borderRadius={25}>
            <Cell>
                <Avatar src={avatar} size={'50px'} borderRadius={'600px'} />
            </Cell>
            <Cell justify={'center'}>{firstName}</Cell>
            <Cell justify={'center'}>{lastName}</Cell>
            <Cell justify={'flex-end'}>{position}</Cell>
        </LineContainer>
    );
};

export default MemberLine;

type LineContainerProps = {
    templateColumns?: string;
    borderRadius?: number;
    width?: string;
};
const LineContainer = styled.div<LineContainerProps>`
    width: '100%';
    height: 80%;
    display: grid;
    grid-template-columns: ${({ templateColumns }) => templateColumns};
    border-radius: ${({ borderRadius }) => `${borderRadius}px`};
    padding-right: 10px;
    padding-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
    background-color: #b3ae6d;
    box-shadow: 10px 5px 5px black;
    &:hover {
        cursor: pointer;
        transform: scale(1.01);
    }
`;

type CellProps = {
    justify?: string;
};
const Cell = styled.div<CellProps>`
    display: flex;
    justify-content: ${({ justify }) => justify};
    align-items: center;
    background-color: #b3ae6d;
`;
