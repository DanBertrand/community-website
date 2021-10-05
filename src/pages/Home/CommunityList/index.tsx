import React, { useEffect } from 'react';
import Loading from 'components/Loading';
import { useFetch } from 'hooks';
import { CommunityType } from 'store/types';
import CommunityCard from '../CommunityCard';

const CommunityList: React.VoidFunctionComponent = (): JSX.Element => {
    const { get, state } = useFetch<CommunityType[]>();
    const { data } = state;

    useEffect(() => {
        get('/communities');
    }, []);

    if (data) {
        return (
            <>
                {data.map((community: CommunityType) => (
                    <CommunityCard
                        key={community.id}
                        id={community.id}
                        name={community.name}
                        address={community?.address?.formatted_address ? community.address.formatted_address : 'none'}
                    />
                ))}
            </>
        );
    } else {
        return (
            <>
                <Loading size={'4em'} />
            </>
        );
    }
};

export default React.memo(CommunityList);
