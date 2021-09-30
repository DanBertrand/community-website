import { useState, useEffect } from 'react';

type ClientInfos = {
    IPv4: string;
    city: string;
    country_code: string;
    country_name: string;
    latitude: undefined | number;
    longitude: undefined | number;
    postal: string;
    state: string;
};

export const useClientInfos = (): ClientInfos => {
    const [clientInfos, setClientInfos] = useState({
        IPv4: '',
        city: '',
        country_code: '',
        country_name: '',
        latitude: undefined,
        longitude: undefined,
        postal: '',
        state: '',
    });
    const getData = async () => {
        const res = await fetch('https://geolocation-db.com/json/');
        setClientInfos(await res.json());
    };

    useEffect(() => {
        getData();
    }, []);

    return clientInfos;
};

{
    /* <span style={{ fontSize: '2em', color: 'red' }}>IP: {IPv4}</span>
<span style={{ fontSize: '2em', color: 'red' }}>City: {city}</span>
<span style={{ fontSize: '2em', color: 'red' }}>{country_code}</span>
<span style={{ fontSize: '2em', color: 'red' }}>Country: {country_name}</span>
<span style={{ fontSize: '2em', color: 'red' }}>Lat: {latitude}</span>
<span style={{ fontSize: '2em', color: 'red' }}>Lng: {longitude}</span>
<span style={{ fontSize: '2em', color: 'red' }}>Postal: {postal}</span>
<span style={{ fontSize: '2em', color: 'red' }}>State: {state}</span> */
}
