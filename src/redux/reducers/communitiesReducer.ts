import { CommunitiesAction } from '../actions';
import { CommunitiesActionType } from '../types';
import { UserCommunity } from '../types/communitiesTypes';

export type CommunityStateType = {
    communities: {
        count: number;
        data: UserCommunity[];
    } | null;
    errorMessage: string;
    isLoading: boolean;
};

const initialState: CommunityStateType = {
    communities: null,
    errorMessage: '',
    isLoading: false,
};

const communitiesReducer = (state = initialState, action: CommunitiesAction): CommunityStateType => {
    console.log('COMMUNITY REDUCER', action);
    switch (action.type) {
        case CommunitiesActionType.LOAD_COMMUNITIES_ATTEMPT:
            return {
                communities: null,
                errorMessage: '',
                isLoading: true,
            };
        case CommunitiesActionType.LOAD_COMMUNITIES_SUCCESS:
            const { total_count, data } = action.payload;
            return {
                ...state,
                communities: {
                    count: total_count,
                    data: data,
                },
                errorMessage: '',
                isLoading: false,
            };
        case CommunitiesActionType.LOAD_COMMUNITIES_ERROR:
            return {
                communities: null,
                errorMessage: action.payload,
                isLoading: false,
            };
        case CommunitiesActionType.DELETE_INFOS:
            return {
                communities: null,
                errorMessage: '',
                isLoading: false,
            };
        default:
            return state;
    }
};

export default communitiesReducer;
