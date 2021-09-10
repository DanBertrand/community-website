import React, { useEffect } from 'react';
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import { CommunityType } from '../../redux/types';
import CommunityCard from './CommunityCard';

const CommunityList: React.FC = () => {
    const { get, data } = useFetch();

    useEffect(() => {
        get('/communities');
    }, []);

    return data ? (
        data.map((community: CommunityType) => (
            <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                address={community?.address?.formatted_address ? community.address.formatted_address : 'none'}
            />
        ))
    ) : (
        <Loading size={'4em'} />
    );
};

export default CommunityList;
