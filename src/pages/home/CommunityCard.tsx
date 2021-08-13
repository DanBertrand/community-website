import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const CommunityCard: React.FC = () => {
    const { get, data, error } = useFetch();

    useEffect(() => {
        get('/communities');
    }, []);

    console.log('DATA', data);
    console.log('ERROR', error);

    return <div>CommunityCard</div>;
};

export default CommunityCard;
