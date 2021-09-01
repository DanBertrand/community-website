import React from 'react';
import { UserType } from '../../../../redux/types';

type TeamProps = {
    members: UserType[];
};

const Team: React.FC<TeamProps> = ({ members }: TeamProps) => {
    console.log('members', members);
    return <p>Number of members : {members.length}</p>;
};

export default Team;
