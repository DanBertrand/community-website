import React from 'react';
import { CommunityType } from 'store/types';

type ProductProps = {
    community: CommunityType;
    editingMode: boolean;
    canEdit: boolean;
};

const Project = (): JSX.Element => {
    return <div>Project</div>;
};

export default Project;
