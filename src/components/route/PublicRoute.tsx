import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserType } from '../../redux/types';

type PublicRouteProps = {
    restricted: boolean;
    component: React.ElementType;
    user: UserType | null;
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
