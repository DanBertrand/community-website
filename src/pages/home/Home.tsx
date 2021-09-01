import React from 'react';
import { ContentContainer } from '../../styles';
import CommunityList from './CommunityList';

const Home: React.FC = () => {
    return (
        <ContentContainer>
            <CommunityList />
        </ContentContainer>
    );
};

export default Home;
