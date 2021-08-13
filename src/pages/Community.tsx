import { CommunityType } from '../redux/types';
import React from 'react';

export type CommunityProps = {
    community: CommunityType;
};

const Community: React.FC<CommunityProps> = ({ community }: CommunityProps): JSX.Element => {
    const { name } = community;
    console.log(name);
    return <h1>{name}</h1>;
};

export default Community;
