import React from 'react';
import useFetch from '../../hooks/useFetch';
import styled from 'styled-components';
import SelectedThemeCard from './themeCards/SelectedThemeCards';
import NormalThemeCard from './themeCards/NormalThemeCards';
import { PublicRouteProps } from '../../components/route/PublicRoute';
import { RouteComponentProps } from 'react-router-dom';
import { RouteParams } from '../../components/route/types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ContentContainer, PageContainer } from '../../styles';
import Loading from '../../components/Loading';
// import Loading from '../../components/Loading';

type CommunityProps = RouteComponentProps<RouteParams> & PublicRouteProps;

const Community: React.FC<CommunityProps> = ({ match }: CommunityProps) => {
    const { communities } = useTypedSelector((state) => state.communities);
    const creatorIds = communities?.creator?.map((community) => community.id);
    const canEdit = creatorIds?.includes(parseInt(match.params.id)) ? true : false;
    const [selectedThemeCard, setSelectedThemeCard] = React.useState('');
    const [editingMode, setEditingMode] = React.useState(false);
    const { get, data: community } = useFetch();

    const cardsTitle = ['Location', 'Team', 'Project', 'Product', 'Job', 'Workshop'];

    React.useEffect(() => {
        get(`/communities/${match.params.id}`);
    }, [match.params.id]);

    const handleSelect = (title: string, editing: boolean) => {
        console.log('Handle Select');
        setEditingMode(editing);
        setSelectedThemeCard(title);
    };

    console.log('match', match.params);
    console.log('creatorIds', creatorIds);
    console.log('communities', communities);

    return (
        <PageContainer>
            {community ? (
                <ContentContainer marginTop={5} marginLeft={10} marginRight={10}>
                    <Title>{community.name}</Title>
                    <Description>{community.description}</Description>
                    <ContentContainer>
                        {!selectedThemeCard ? (
                            <WrapperDefault>
                                {cardsTitle.map((title, index) => (
                                    <NormalThemeCard
                                        key={index}
                                        selectedThemeCard={selectedThemeCard}
                                        canEdit={canEdit}
                                        handleSelect={handleSelect}
                                        title={title}
                                    />
                                ))}
                            </WrapperDefault>
                        ) : (
                            <>
                                <WrapperSelected>
                                    <SelectedThemeCard
                                        community={community}
                                        title={selectedThemeCard}
                                        editingMode={editingMode}
                                    />
                                </WrapperSelected>
                                <WrapperDefault>
                                    {cardsTitle?.map((title, index) => (
                                        <NormalThemeCard
                                            selectedThemeCard={selectedThemeCard}
                                            key={index}
                                            canEdit={canEdit}
                                            handleSelect={handleSelect}
                                            title={title}
                                        />
                                    ))}
                                </WrapperDefault>
                            </>
                        )}
                    </ContentContainer>
                </ContentContainer>
            ) : (
                <Loading />
            )}
        </PageContainer>
    );
};

export default Community;

const Title = styled.h1`
    text-align: center;
    padding-bottom: 30px;
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
