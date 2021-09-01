import React, { Suspense } from 'react';
import { CommunityType } from '../../../redux/types';
import { MainCard } from '../../../styles/index';

// import Location from './type/Location';
// import Project from './type/Project';
// import Product from './type/Product';
// import Job from './type/Job';
// import Team from './type/Team';

const Product = React.lazy(() => import('./type/Product'));
const Job = React.lazy(() => import('./type/Job'));
const Team = React.lazy(() => import('./type/Team'));
const Location = React.lazy(() => import('./type/Location'));
// const Project = React.lazy(() => import('./type/Project'));
import Loading from '../../../components/Loading';

type SelectedThemeCardProps = {
    title: string;
    community: CommunityType;
    editingMode: boolean;
};

const SelectedThemeCard: React.FC<SelectedThemeCardProps> = ({
    title,
    community,
    editingMode,
}: SelectedThemeCardProps) => {
    console.log('Editing Mode', editingMode);

    return (
        <MainCard center>
            <h2>
                {title}
                {editingMode && '(EditMode)'}
            </h2>

            <Suspense
                fallback={
                    <div>
                        <Loading size={'5em'} />
                    </div>
                }
            >
                {(() => {
                    switch (title) {
                        case 'Location':
                            return <Location community={community} />;
                        case 'Product':
                            return <Product community={community} />;
                        // case 'Project':
                        //     return <Project community={community} />;
                        case 'Team':
                            return <Team members={community.users} />;
                        case 'Job':
                            return <Job community={community} />;
                        // case 'Workshop':
                        //     return <Workshop community={community} />;
                    }
                })()}
            </Suspense>
        </MainCard>
    );
};

export default SelectedThemeCard;
