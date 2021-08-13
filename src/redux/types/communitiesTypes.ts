export enum CommunitiesActionType {
    LOAD_COMMUNITIES_ATTEMPT = 'load_communities_attempt',
    LOAD_COMMUNITIES_SUCCESS = 'load_communities_success',
    LOAD_COMMUNITIES_ERROR = 'load_communities_error',
    DELETE_INFOS = 'delete_infos',
}

export type CommunityType = {
    id: number;
    name: string;
    address: string;
    description: string;
    members: [];
    created_at: string;
    updated_at: string;
};
