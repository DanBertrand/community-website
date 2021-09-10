import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

export type MapProps = {
    lat: number;
    lng: number;
    text?: string;
};

const Map: React.FC<MapProps> = ({ lat, lng }: MapProps) => {
    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    console.log('lat', 'lng', lat, lng);

    return (
        <div style={{ height: '100vh', width: '90%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${googleApiKey}` }}
                yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                center={{
                    lat: lat,
                    lng: lng,
                }}
                defaultZoom={11}
            >
                <Marker lat={lat} lng={lng} text="My Marker" />
            </GoogleMapReact>
        </div>
    );
};

export default Map;

// export const MAP_SETTINGS = {
//     DEFAULT_MAP_OPTIONS: {
//         scrollwheel: false,
//         mapTypeControl: false,
//         fullscreenControl: false,
//         streetViewControl: false,
//     },
//     DEFAULT_CENTER: { lat: 57, lng: 20 },
//     DEFAULT_ZOOM: 4,
//     MARKER_SIZE: 35,
//     PIXEL_OFFSET: {
//         MARKER: {
//             X: 0,
//             Y: -35,
//         },
//     },
//     DIRECTIONS_OPTIONS: { suppressMarkers: true, preserveViewport: true },
// };
