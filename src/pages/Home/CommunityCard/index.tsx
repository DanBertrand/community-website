import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
// import { GrMapLocation } from 'react-icons/gr';
// import { FaCarrot } from 'react-icons/fa';
// import { RiTeamLine } from 'react-icons/ri';
// import { GiCrosscutSaw } from 'react-icons/gi';
// import { GiStrong } from 'react-icons/gi';
// import { BiEdit } from 'react-icons/bi';
// import { theme } from '../../styles/theme';

type CommunityCardProps = {
    id: number;
    name: string;
    address: string;
};

const CommunityCard: React.FC<CommunityCardProps> = ({ id, name, address }: CommunityCardProps): JSX.Element => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/communities/${id}`);
    };

    return (
        <>
            <StyledCard onClick={handleClick}>
                <h1>{name}</h1>
                <p>{address}</p>
            </StyledCard>
        </>
    );
};

export default React.memo(CommunityCard);

const StyledCard = styled.div`
    border: solid black;
    cursor: pointer;
    flex-shrink: 1;
    margin: 1em 0 1em 0;
    transition: all 0.25s ease-in;
    &:hover {
        color: #f8c471;
        background-color: #424949;
        box-shadow: 12px 12px 2px 1px rgba(127, 108, 164);
    }
`;
