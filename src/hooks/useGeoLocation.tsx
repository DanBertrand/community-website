import React from 'react';

type Error = {
    code: number;
    message: string;
};

type Position = {
    coords: Coordinates;
};

type Coordinates = {
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number | null;
    longitude: number | null;
    speed: number | null;
};

type UseGeoLocationReturn = {
    coordinates: Coordinates | undefined;
    permission: boolean;
    errors: string;
};

export const useGeoLocation = (): UseGeoLocationReturn => {
    const [coordinates, setCoordinates] = React.useState<Coordinates>();
    const [permission, setPermission] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState('');
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    const success = (pos: Position) => {
        setCoordinates(pos.coords);
    };
    const err = ({ code, message }: Error) => {
        console.warn(`ERROR(${code}): ${message}`);
        setErrors(`ERROR(${code}): ${message}`);
    };

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'granted') {
                    setPermission(true);
                    console.log(result.state);
                    //If granted then you can directly call your function here
                    navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === 'prompt') {
                    navigator.geolocation.getCurrentPosition(success, err, options);
                } else if (result.state === 'denied') {
                    setPermission(false);
                    //If denied then you have to show instructions to enable location
                }
                result.onchange = () => {
                    console.log(result.state);
                };
            });
        } else {
            alert('Sorry Not available!');
        }
    }, []);

    return { coordinates, permission, errors };
};

// console.log('***************************  GEO LOCATION  **************************************');
// console.log('Coordinates', coordinates);
// console.log('Permission', permission);
// console.log('Errors', errors);
// console.log('***************************************************************************');
