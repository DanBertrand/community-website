import React from 'react';
import styled from 'styled-components';
import SelectedThemeCard from './SelectedThemeCards';
import NormalThemeCard from './NormalThemeCards';
import { PublicRouteProps } from 'components/route/PublicRoute';
import { RouteComponentProps } from 'react-router-dom';
import { RouteParams } from 'components/route/types';
import { ContentContainer } from 'styles';
import Loading from 'components/Loading';
import { useFetch } from 'hooks';
import { CommunityType } from 'store/types';
import { useTranslation } from 'react-i18next';

type CommunityProps = RouteComponentProps<RouteParams> & PublicRouteProps;

export type Card = {
    id: number;
    title: string;
};

const Community: React.FC<CommunityProps> = ({ match }: CommunityProps) => {
    const { t } = useTranslation('community');
    const { state, get } = useFetch<CommunityType>();
    const { data: community, isLoading } = state;

    const [selectedThemeCard, setSelectedThemeCard] = React.useState<Card>();
    const [editingMode, setEditingMode] = React.useState(false);

    const [cardsList, setCardsList] = React.useState<Card[]>([]);
    const cards = [
        { id: 1, title: t('location') },
        { id: 2, title: t('team') },
        { id: 3, title: t('workshop') },
        { id: 4, title: t('job') },
        { id: 5, title: t('product') },
        { id: 6, title: t('project') },
    ];

    const generateCardsList = () => {
        if (community) {
            let list = [...cards];
            if (community.is_admin) {
                setCardsList(list);
            } else {
                if (!community.has_workshops) {
                    list = list.filter((card) => card.id != 3);
                }
                if (!community.has_jobs) {
                    list = list.filter((card) => card.id != 4);
                }
                setCardsList(list);
            }
        }
    };

    React.useEffect(() => {
        get(`/communities/${match.params.id}`);
    }, [match.params.id]);

    React.useEffect(() => {
        if (community) {
            generateCardsList();
        }
    }, [community]);

    const handleSelect = (id: number, editing: boolean) => {
        if (selectedThemeCard?.id === id && editingMode) {
            setEditingMode(false);
        } else {
            setEditingMode(editing);
            setSelectedThemeCard(cards.find((card) => card.id === id));
        }
    };

    const toggleEditingMode = () => {
        setEditingMode(!editingMode);
    };

    console.log('community', community);
    console.log('cardsList', cardsList);

    return (
        <>
            {isLoading && <Loading modal={true} />}
            {/* {isModalOpen && (
                <Modal warning={warning} onClickOut={() => setIsModalOpen(false)}>
                    <ContentContainer grow={0} direction={'row'}>
                        <Button active={true} type="button" onClick={toggleSubscription}>
                            Yes
                        </Button>
                        <Button active={true} type="button" onClick={() => setIsModalOpen(false)}>
                            No
                        </Button>
                    </ContentContainer>
                </Modal>
            )} */}

            {community ? (
                <ContentContainer grow={0}>
                    {/* <Icon onClick={() => setIsModalOpen(true)} active={role ? true : false}>
                            {role ? (
                                <>
                                    <ImExit size={40} />
                                    <span>{role}</span>
                                </>
                            ) : (
                                <ImEnter size={40} />
                            )}
                        </Icon> */}
                    <Title>{community.name}</Title>
                    <Description>{community.description}</Description>
                    <ContentContainer alignItems={'center'}>
                        {selectedThemeCard && (
                            <WrapperSelected>
                                <SelectedThemeCard
                                    community={community}
                                    card={selectedThemeCard}
                                    editingMode={editingMode}
                                    toggleEditingMode={toggleEditingMode}
                                    canEdit={community?.is_admin}
                                />
                            </WrapperSelected>
                        )}
                        <WrapperDefault>
                            {cardsList.map(({ id, title }) => (
                                <NormalThemeCard
                                    key={id}
                                    id={id}
                                    selectedThemeCard={selectedThemeCard}
                                    canEdit={community?.is_admin}
                                    handleSelect={handleSelect}
                                    title={title}
                                    editingMode={editingMode}
                                />
                            ))}
                        </WrapperDefault>
                    </ContentContainer>
                </ContentContainer>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Community;

const Title = styled.h1`
    margin: none;
    text-align: center;
    padding-top: none;
    padding-bottom: 45px;
    font-size: 6em;
`;

const Description = styled.p`
    text-align: center;
    margin-bottom: 80px;
`;

export const WrapperDefault = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export const WrapperSelected = styled.div`
    margin-bottom: 20px;
`;
