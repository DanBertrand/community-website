import { CommunityType, CommunitiesActionType } from '../types';

interface LoadCommunitiesAttempt {
    type: CommunitiesActionType.LOAD_COMMUNITIES_ATTEMPT;
}

interface LoadCommunitiesSuccess {
    type: CommunitiesActionType.LOAD_COMMUNITIES_SUCCESS;
    payload: {
        total_count: number;
        creator: CommunityType[];
        member: CommunityType[];
    };
}

interface LoadCommunitiesError {
    type: CommunitiesActionType.LOAD_COMMUNITIES_ERROR;
    payload: string;
}

interface DeleteCommunitiesInfo {
    type: CommunitiesActionType.DELETE_INFOS;
}

export type CommunitiesAction =
    | LoadCommunitiesAttempt
    | LoadCommunitiesSuccess
    | LoadCommunitiesError
    | DeleteCommunitiesInfo;
