import React, { Suspense } from 'react';
import { CommunityType } from 'store/types';
import { MainCard } from 'styles/index';
const Product = React.lazy(() => import('./cards/Product'));
const Job = React.lazy(() => import('./cards/Job'));
const Team = React.lazy(() => import('./cards/Team'));
const Location = React.lazy(() => import('./cards/Location'));
// const Project = React.lazy(() => import('./type/Project'));
const Workshop = React.lazy(() => import('./cards/Workshop'));
import EditIcon from 'components/EditIcon';
import { Card } from '..';

type SelectedThemeCardProps = {
    card: Card;
    community: CommunityType;
    editingMode: boolean;
    canEdit: boolean;
    toggleEditingMode: () => void;
};

const SelectedThemeCard: React.FC<SelectedThemeCardProps> = ({
    card,
    community,
    editingMode,
    toggleEditingMode,
    canEdit,
}: SelectedThemeCardProps) => {
    const { id, title } = card;
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
                    switch (id) {
                        case 1:
                            return <Location canEdit={canEdit} address={community.address} editingMode={editingMode} />;
                        case 2:
                            return (
                                <Team
                                    canEdit={canEdit}
                                    membersCount={community.members_count}
                                    creator={community.creator}
                                    editingMode={editingMode}
                                />
                            );
                        case 3:
                            return <Workshop canEdit={canEdit} editingMode={editingMode} community={community} />;
                        case 4:
                            return <Job canEdit={canEdit} community={community} editingMode={editingMode} />;
                        case 5:
                            return <Product canEdit={canEdit} community={community} editingMode={editingMode} />;
                        // case 6:
                        //     return <Project community={community} />;
                    }
                })()}
            </Suspense>
        </MainCard>
    );
};

export default SelectedThemeCard;
