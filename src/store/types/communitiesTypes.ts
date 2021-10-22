import { UserType } from './authTypes';

export enum CommunitiesActionType {
    LOAD_COMMUNITIES_ATTEMPT = 'load_communities_attempt',
    LOAD_COMMUNITIES_SUCCESS = 'load_communities_success',
    LOAD_COMMUNITIES_ERROR = 'load_communities_error',
    DELETE_INFOS = 'delete_infos',
}

export type UserCommunity = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    user_infos: {
        member_id: number;
        role: string;
    };
};

export type CommunityType = {
    id: number;
    member_id: number;
    creator: UserType;
    members_count: number;
    is_admin: boolean;
    name: string;
    description: string;
    address: AddressType;
    has_jobs: boolean;
    has_workshops: boolean;
    created_at: string;
    updated_at: string;
};

export type AddressType = {
    id: number;
    formatted_address: string;
    house_number: string;
    street: string;
    post_code: string;
    state: string;
    country: string;
    city: string;
    latitude: string;
    longitude: string;
};

export type Member = UserType & {
    member_id: number;
};
