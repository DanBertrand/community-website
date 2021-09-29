import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CommunityType, UserType } from 'store/types';

export type PrivateRouteProps = {
    restricted: boolean;
    component: React.ElementType;
    user: UserType;
    path: string;
    exact?: boolean;
    community?: CommunityType;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    user,
    community,
    ...rest
}: PrivateRouteProps) => {
    // if (!user) {
    //     displaySuccess('Log in in order to continue');
    // }
    return (
        <Route
            {...rest}
            render={(props) =>
                !user ? <Redirect to="/login" /> : <Component {...props} user={user} community={community} />
            }
        />
    );
};
