import { UserType } from 'store/types';
import { UserCommunity } from 'store/types/communitiesTypes';

export const message = {
    success: 'Successful action',
    error: 'Error occurred',
};

export const user: UserType = {
    id: 1,
    email: 'dan@gmail.com',
    confirmation_token: 'zbsH5KgesgAP2QoU6BDF',
    confirmed_at: '2021-09-29T15:22:39.275Z',
    confirmation_sent_at: '2021-09-29T15:21:09.962Z',
    first_name: 'Dan',
    last_name: 'Bertrand',
    has_communities: false,
    jobs: [],
    workshops: [],
    avatar: {
        id: 1,
        url: 'http://res.cloudinary.com/dbdsnd/image/upload/v1633254625/acojsdlldhgs5ezv6my.jpg',
        public_id: 'acojsiwppdhgs5ezv6my',
    },
};

export const community: UserCommunity = {
    id: 1,
    name: 'Beautiful Place',
    description: 'A little paradise close to lacs and mountains',
    created_at: '2021-10-06T16:56:40.130Z',
    updated_at: '2021-10-06T16:56:40.130Z',
    user_infos: {
        member_id: 6,
        role: 'creator',
    },
};

export const userCommunities = {
    total_count: 1,
    data: [community],
};
