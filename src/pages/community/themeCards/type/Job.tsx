import React from 'react';
import { CommunityType } from '../../../../redux/types';

type JobProps = {
    community: CommunityType;
};

const Job: React.FC<JobProps> = () => {
    return <div>Job</div>;
};

export default Job;
