import React from 'react';
import { UserType } from 'store/types';
import styled from 'styled-components';
import MemberLine from './MemberLine';

type TeamProps = {
    membersCount: number;
    creator: UserType;
    // moderators: UserType[];
    // members: UserType[];
    editingMode: boolean;
};

const Team: React.FC<TeamProps> = ({ membersCount, creator }: TeamProps) => {
    return (
        <>
            <p>Number of members : {membersCount}</p>
            <GridContainer width={'85%'}>
                <LineContainer noStyle={true} templateColumns={'10% 40% 40% 10%'}>
                    <Cell noStyle={true}></Cell>
                    <Cell noStyle={true} justify={'center'}>
                        First Name
                    </Cell>
                    <Cell noStyle={true} justify={'center'}>
                        Last Name
                    </Cell>
                    <Cell noStyle={true} justify={'flex-end'}>
                        Position
                    </Cell>
                </LineContainer>
                <MemberLine
                    avatar={creator.avatar?.url}
                    firstName={creator.first_name}
                    lastName={creator.last_name}
                    position="Creator"
                />
                {/* {moderators.map((moderator) => (
                    <MemberLine
                        key={moderator.id}
                        id={moderator.id}
                        avatar={moderator.avatar?.url}
                        firstName={moderator.first_name}
                        lastName={moderator.last_name}
                        position="Moderator"
                    />
                ))}
                {members.map((member) => (
                    <MemberLine
                        key={member.id}
                        id={member.id}
                        avatar={member.avatar?.url}
                        firstName={member.first_name}
                        lastName={member.last_name}
                        position="Member"
                    />
                ))} */}
            </GridContainer>
        </>
    );
};

export default Team;

type GridContainerProps = {
    templateColumns?: string;
    borderRadius?: number;
    width?: string;
};
const GridContainer = styled.div<GridContainerProps>`
    width: ${({ width }) => (width ? width : '100%')};
    height: 100%;
    display: grid;
    grid-template-columns: ${({ templateColumns }) => templateColumns};
    border-radius: ${({ borderRadius }) => `${borderRadius}px`};
    padding: 80px 80px 80px 80px;
    max-height: 500px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

type LineContainerProps = {
    templateColumns?: string;
    borderRadius?: number;
    width?: string;
    noStyle: boolean;
};
const LineContainer = styled.div<LineContainerProps>`
    width: '100%';
    height: 80%;
    display: grid;
    grid-template-columns: ${({ templateColumns }) => templateColumns};
    border-radius: ${({ borderRadius }) => `${borderRadius}px`};
    padding-right: 10px;
    padding-left: 10px;
    ${({ noStyle }) =>
        !noStyle &&
        `
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
    background-color: #b3ae6d;
    box-shadow: 10px 5px 5px black;`};
`;

type CellProps = {
    justify?: string;
    noStyle: boolean;
};
const Cell = styled.div<CellProps>`
    display: flex;
    justify-content: ${({ justify }) => justify};
    align-items: center;
    ${({ noStyle }) => !noStyle && 'background-color: #b3ae6d;'};
`;
