import React, { Suspense } from 'react';
import { CommunityType } from 'store/types';
import { MainCard } from 'styles/index';
const Product = React.lazy(() => import('./cards/Product/Product'));
const Job = React.lazy(() => import('./cards/Job'));
const Team = React.lazy(() => import('./cards/Team'));
const Location = React.lazy(() => import('./cards/Location'));
// const Project = React.lazy(() => import('./type/Project'));
const Workshop = React.lazy(() => import('./cards/Workshop'));
import EditIcon from 'components/EditIcon';

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
