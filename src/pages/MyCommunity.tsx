import { CommunityType } from '../redux/types';
import React from 'react';

export type MyCommunityProps = {
    community: CommunityType;
};

const MyCommunity: React.FC<MyCommunityProps> = ({ community }: MyCommunityProps): JSX.Element => {
    const { name } = community;
    console.log(name);
    return <h1>{name}</h1>;
};

export default MyCommunity;
