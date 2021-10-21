export type AddressInputs = {
    houseNumber: string;
    street: string;
    postCode: string;
    city: string;
    state: string;
    country: string;
};

type Location = {
    formatted_address: string;
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

    const localisation = await resp.json();

    if (localisation.features.length > 0) {
        const location: Location = {
            longitude: localisation.features[0].geometry.coordinates[0],
            latitude: localisation.features[0].geometry.coordinates[1],
            formatted_address: localisation.features[0].properties.formatted,
        };
        return location;
    } else {
        return {
            longitude: '',
            latitude: '',
            formatted_address: `${houseNumber} ${street} ${postCode} ${city} ${state} ${country}`,
        };
    }
};
