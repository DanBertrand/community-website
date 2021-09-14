import React from 'react';
import styled from 'styled-components';
import { PrivateRouteProps } from '../../components/route/PrivateRoute';
import EditIcon from '../../components/EditIcon';
import { Column, ContentContainer, PageContainer } from '../../styles';
import { MainCard } from '../../styles/index';
import ProfileEdit from './ProfileEdit';

const Profile: React.FC<PrivateRouteProps> = ({ user }: PrivateRouteProps) => {
    const [editing, setEditing] = React.useState(false);

    return (
        <PageContainer>
            <MainCard>
                <EditIcon onClick={() => setEditing(!editing)} marginTop={5} marginRight={5} />
                <Title>Profile</Title>
                {!editing ? (
                    <ContentContainer direction={'row'}>
                        <Column>
                            <span>{user.email}</span>
                            <span>{user.first_name}</span>
                            <span>{user.last_name}</span>
                        </Column>
                        <Column>
                            <img
                                alt="Profile Picture"
                                style={{
                                    borderRadius: '15px',
                                    border: 'solid black',
                                    width: '200px',
                                    height: '200px',
                                }}
                                src={user.avatar?.url}
                            />
                        </Column>
                    </ContentContainer>
                ) : (
                    <ProfileEdit user={user} />
                )}
            </MainCard>
        </PageContainer>
    );
};

export default Profile;

const Title = styled.h2`
    align-self: center;
    font-weight: bold;
    font-size: 52px;
    padding-bottom: 15px;
`;
