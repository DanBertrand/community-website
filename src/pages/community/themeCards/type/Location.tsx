import React from 'react';
import { CommunityType } from '../../../../redux/types';
import Map from '../../../../components/Map';
// import styled from 'styled-components';

type LocationProps = {
    community: CommunityType;
};
const Location: React.FC<LocationProps> = ({ community }: LocationProps) => {
    return (
        <>
            <h3>{community.address}</h3>
            <Map lat={community.latitude} lng={community.longitude} />
        </>
    );
};

export default Location;

// const StyledSelectedThemeCard = styled.div`
//     background-color: blue;
//     min-height: 200px;
//     min-width: 50%;
// `;
