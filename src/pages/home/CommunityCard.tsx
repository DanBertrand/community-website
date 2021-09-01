import React from 'react';
import { useHistory } from 'react-router-dom';
// import { GrMapLocation } from 'react-icons/gr';
// import { FaCarrot } from 'react-icons/fa';
// import { RiTeamLine } from 'react-icons/ri';
// import { GiCrosscutSaw } from 'react-icons/gi';
// import { GiStrong } from 'react-icons/gi';
// import { BiEdit } from 'react-icons/bi';

type CommunityCardProps = {
    id: number;
    name: string;
    address: string;
};

const CommunityCard: React.FC<CommunityCardProps> = ({ id, name, address }: CommunityCardProps) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/communities/${id}`);
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            <h1>{name}</h1>
            <p>{address}</p>
        </div>
    );
};

export default CommunityCard;
