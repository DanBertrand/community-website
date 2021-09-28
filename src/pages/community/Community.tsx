import React from 'react';
import styled from 'styled-components';
import SelectedThemeCard from './themeCards/SelectedThemeCards';
import NormalThemeCard from './themeCards/NormalThemeCards';
import { PublicRouteProps } from '../../components/route/PublicRoute';
import { RouteComponentProps } from 'react-router-dom';
import { RouteParams } from '../../components/route/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ContentContainer, PageContainer } from '../../styles';
import Loading from '../../components/Loading';
// import { ImExit } from 'react-icons/im';
// import { ImEnter } from 'react-icons/im';
// import Icon from '../../components/Icon';
// import { useActions } from '../../hooks/useActions';
import useFetch from '../../hooks/useFetch';
import { CommunityType } from '../../redux/types';

type CommunityProps = RouteComponentProps<RouteParams> & PublicRouteProps;

const Community: React.FC<CommunityProps> = ({ match }: CommunityProps) => {
    // const { loadCommunities } = useActions();
    const { state, get } = useFetch<CommunityType>();
    const { data: community, isLoading } = state;
    const { communities } = useTypedSelector((state) => state.communities);
    const userInfos = communities?.data.find((community) => community.id === parseInt(match.params.id))?.user_infos;
    const [selectedThemeCard, setSelectedThemeCard] = React.useState('');
    const [editingMode, setEditingMode] = React.useState(false);
    const role = userInfos?.role ? userInfos.role : '';
    // const memberId = userInfos?.member_id ? userInfos.member_id : null;
    // const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [cardsTitle, setCardsTitle] = React.useState<string[]>([]);

    const generateCardsTitle = () => {
        let cardsList = ['Location', 'Team'];
        console.log('role', role);
        if (role === 'creator') {
            console.log('CREATOR');
            cardsList = [...cardsList, 'Workshop', 'Job'];
        } else if (community) {
            if (community.has_workshops) {
                cardsList.push('Workshop');
            }
            if (community.has_jobs) {
                cardsList.push('Job');
            }
        }
        setCardsTitle(cardsList);
    };

    // const warning = role ? 'Leave the community ?' : 'Join the community ?';

    // const toggleSubscription = async () => {
    //     if (user && !memberId) {
    //         await post(`/communities/${match.params.id}/members`, body, loadCommunities);
    //     } else {
    //         await remove(`/communities/${match.params.id}/members/${memberId}`, { url: 'none' }, loadCommunities);
    //     }
    // };

    React.useEffect(() => {
        get(`/communities/${match.params.id}`);
    }, [match.params.id, communities]);

    React.useEffect(() => {
        if (community) {
            generateCardsTitle();
        }
    }, [community]);

    const handleSelect = (title: string, editing: boolean) => {
        if (selectedThemeCard === title && editingMode) {
            setEditingMode(false);
        } else {
            setEditingMode(editing);
            setSelectedThemeCard(title);
        }
    };

    const toggleEditingMode = () => {
        setEditingMode(!editingMode);
    };

    console.log('Community', community);

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
            <PageContainer>
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
                                        title={selectedThemeCard}
                                        editingMode={editingMode}
                                        toggleEditingMode={toggleEditingMode}
                                        canEdit={role ? true : false}
                                    />
                                </WrapperSelected>
                            )}
                            <WrapperDefault>
                                {cardsTitle?.map((title, index) => (
                                    <NormalThemeCard
                                        key={index}
                                        selectedThemeCard={selectedThemeCard}
                                        canEdit={role ? true : false}
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
            </PageContainer>
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
