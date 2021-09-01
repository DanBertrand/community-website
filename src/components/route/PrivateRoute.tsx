import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CommunityType, UserType } from '../../redux/types';

export type PrivateRouteProps = {
    restricted: boolean;
    component: React.ElementType;
    user: UserType;
    path: string;
    exact?: boolean;
    community?: CommunityType;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    user,
    community,
    ...rest
}: PrivateRouteProps) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                !user ? <Redirect to="/login" /> : <Component {...props} user={user} community={community} />
            }
        />
    );
};

export default PrivateRoute;
