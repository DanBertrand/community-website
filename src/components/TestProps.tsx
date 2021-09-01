/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ContentContainer, PageContainer } from '../styles';
import { PrivateRouteProps } from './route/PrivateRoute';

type RouteParams = {
    id: string;
};
//  React.Component<RouteComponentProps<RouteParams>, FetchDataExampleState>

type TestProps = RouteComponentProps<RouteParams> & PrivateRouteProps;

const TestProps: React.FC<TestProps> = ({ match, user }: TestProps) => {
    console.log('match', match.params.id);
    console.log('user', user);
    return (
        <PageContainer>
            <ContentContainer color={'red'}>Test Props</ContentContainer>
        </PageContainer>
    );
};

export default TestProps;
