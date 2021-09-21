import React, { Suspense } from 'react';
import { CommunityType } from '../../../redux/types';
import { MainCard } from '../../../styles/index';
// import Loading from '../../../components/Loading';

const Product = React.lazy(() => import('./type/Product'));
const Job = React.lazy(() => import('./type/Job'));
const Team = React.lazy(() => import('./type/team/Team'));
const Location = React.lazy(() => import('./type/Location'));
// const Project = React.lazy(() => import('./type/Project'));
const Workshop = React.lazy(() => import('./type/Workshop'));
import EditIcon from '../../../components/EditIcon';

type SelectedThemeCardProps = {
    title: string;
    community: CommunityType;
    editingMode: boolean;
    canEdit: boolean;
    toggleEditingMode: () => void;
};

const SelectedThemeCard: React.FC<SelectedThemeCardProps> = ({
    title,
    community,
    editingMode,
    toggleEditingMode,
    canEdit,
}: SelectedThemeCardProps) => {
    console.log('community', community);

    return (
        <MainCard>
            {canEdit && <EditIcon onClick={toggleEditingMode} active={editingMode} marginTop={5} marginRight={5} />}
            <h2 style={{ alignSelf: 'center' }}>
                {title}
                {editingMode && '(EditMode)'}
            </h2>

            <Suspense
                fallback={
                    // <div>
                    //     <Loading size={'5em'} />
                    // </div>
                    null
                }
            >
                {(() => {
                    switch (title) {
                        case 'Location':
                            return <Location address={community.address} editingMode={editingMode} />;
                        case 'Product':
                            return <Product community={community} editingMode={editingMode} />;
                        case 'Team':
                            return (
                                <Team
                                    membersCount={community.members_count}
                                    creator={community.creator}
                                    moderators={community.moderators}
                                    members={community.members}
                                    editingMode={editingMode}
                                />
                            );
                        case 'Job':
                            return <Job community={community} editingMode={editingMode} />;
                        // case 'Project':
                        //     return <Project community={community} />;
                        case 'Workshop':
                            return <Workshop editingMode={editingMode} community={community} />;
                    }
                })()}
            </Suspense>
        </MainCard>
    );
};

export default SelectedThemeCard;
