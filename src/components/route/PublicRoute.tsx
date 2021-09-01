import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CommunityType, UserType } from '../../redux/types';

export type PublicRouteProps = {
    restricted: boolean;
    component: React.ElementType;
    user?: UserType | null;
    communities?: {
        count: number;
        creator?: CommunityType[];
        member?: CommunityType[];
    };
    path: string;
    exact?: boolean;
};

const PublicRoute: React.FC<PublicRouteProps> = ({
    component: Component,
    restricted,
    user,
    ...rest
}: PublicRouteProps) => {
    return (
        <Route {...rest} render={(props) => (user && restricted ? <Redirect to="/" /> : <Component {...props} />)} />
    );
};

export default PublicRoute;
