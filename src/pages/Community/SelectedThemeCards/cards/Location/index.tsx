import React from 'react';
import Map from 'components/Map';
import { AddressType } from 'store/types/communitiesTypes';

type LocationProps = {
    address: AddressType;
    editingMode: boolean;
    canEdit: boolean;
};
const Location = ({ address }: LocationProps): JSX.Element => {
    const { formatted_address, house_number, street, city, post_code, country, latitude, longitude } = address;

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>
                {formatted_address ? formatted_address : `${house_number} ${street} ${city} ${post_code} ${country}`}
            </h3>
            <a
                href={`https://www.google.com/maps/place/${house_number}+${street}+${city}+${country}`}
                target="_blank"
                rel="noreferrer"
            >
                Google
            </a>
            <Map lat={parseFloat(latitude)} lng={parseFloat(longitude)} />
        </div>
    );
};

export default Location;
