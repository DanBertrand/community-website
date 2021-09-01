import { UserType } from './authTypes';

export enum CommunitiesActionType {
    LOAD_COMMUNITIES_ATTEMPT = 'load_communities_attempt',
    LOAD_COMMUNITIES_SUCCESS = 'load_communities_success',
    LOAD_COMMUNITIES_ERROR = 'load_communities_error',
    DELETE_INFOS = 'delete_infos',
}

export type CommunityType = {
    id: number;
    creator_id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    description: string;
    members: [];
    users: UserType[];
    created_at: string;
    updated_at: string;
};
