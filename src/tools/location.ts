export type AddressInputs = {
    houseNumber: string;
    street: string;
    postCode: string;
    city: string;
    state: string;
    country: string;
};

type Location = {
    address: string;
    longitude: string;
    latitude: string;
};

const geoapifyApiKey = process.env.REACT_APP_GEOAPIFY_KEY;

export const getLocation = async ({
    houseNumber,
    street,
    postCode,
    city,
    state,
    country,
}: AddressInputs): Promise<Location> => {
    const resp = await fetch(
        `https://api.geoapify.com/v1/geocode/search?${houseNumber && `&housenumber=${houseNumber}`}${
            street && `&street=${street}`
        }${postCode && `&postcode=${postCode}`}${city && `&city=${city}`}${
            state && `&state=${state}`
        }&country=${country}&apiKey=${geoapifyApiKey}`,
    );
    console.log('Resp', resp);
    const localisation = await resp.json();

    if (localisation.features.length > 0) {
        console.log('localisation OK', localisation);

        const location: Location = {
            longitude: localisation.features[0].geometry.coordinates[0],
            latitude: localisation.features[0].geometry.coordinates[1],
            address: localisation.features[0].properties.formatted,
        };

        return location;
    } else {
        console.log('localisation PAS OK', localisation);
        return {
            longitude: '',
            latitude: '',
            address: `${houseNumber} ${street} ${postCode} ${city} ${state} ${country}`,
        };
    }
};
