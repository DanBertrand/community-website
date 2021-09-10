import { CommunitiesActionType } from '../types';
import { UserCommunity } from '../types/communitiesTypes';

interface LoadCommunitiesAttempt {
    type: CommunitiesActionType.LOAD_COMMUNITIES_ATTEMPT;
}

interface LoadCommunitiesSuccess {
    type: CommunitiesActionType.LOAD_COMMUNITIES_SUCCESS;
    payload: {
        total_count: number;
        data: UserCommunity[];
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
