import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

const CommunityList: React.FC = () => {
    const { get } = useFetch();

    useEffect(() => {
        get('/communities');
    }, []);

    return <div>CommunityList</div>;
};

export default CommunityList;
