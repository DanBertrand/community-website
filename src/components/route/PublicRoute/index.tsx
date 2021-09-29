import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CommunityType, UserType } from 'store/types';

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

export const PublicRoute: React.FC<PublicRouteProps> = ({
    component: Component,
    restricted,
    communities,
    user,
    ...rest
}: PublicRouteProps) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                user && restricted ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} user={user} communities={communities} />
                )
            }
        />
    );
};
