import React from 'react';
import Map from '../../../../components/Map';
import { AddressType } from '../../../../redux/types/communitiesTypes';

type LocationProps = {
    address: AddressType;
    editingMode: boolean;
};
const Location: React.FC<LocationProps> = ({ address }: LocationProps) => {
    const { formatted_address, house_number, street, city, post_code, country, latitude, longitude } = address;

    // id
    // state,
    return (
        <>
            <h3>
                {formatted_address ? formatted_address : `${house_number} ${street} ${city} ${post_code} ${country}`}
            </h3>
            <a
                href={`https://www.google.com/maps/place/${house_number}+${street}+${city}+${country}`}
                // https://www.google.com/maps/place/478+Rte+de+Haut+Mornex,+74800+Saint-Laurent,+France/
                // href={`https://maps.google.com/?ll=${latitude},${longitude}`}
                target="_blank"
                rel="noreferrer"
            >
                Google
            </a>

            <Map lat={parseFloat(latitude)} lng={parseFloat(longitude)} />
        </>
    );
};

export default Location;
