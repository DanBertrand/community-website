import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CommunityType, UserType } from '../../redux/types';

type PrivateRouteProps = {
    restricted: boolean;
    component: React.ElementType;
    user: UserType | null;
    path: string;
    exact: boolean;
    community?: CommunityType;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    user,
    community,
    ...rest
}: PrivateRouteProps) => {
    console.log('COMMUNITTy', community);
    return (
        <Route
            {...rest}
            render={(props) =>
                !user ? (
                    <Redirect to="/login" />
                ) : community ? (
                    <Component {...props} community={community} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
