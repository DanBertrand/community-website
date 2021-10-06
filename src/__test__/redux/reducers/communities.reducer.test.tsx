import communitiesReducer, { CommunityStateType } from 'store/reducers/communitiesReducer';
import { CommunitiesActionType } from 'store/types';
import { userCommunities, message } from '__test__/___mock___/data';

const initialState: CommunityStateType = {
    communities: null,
    errorMessage: '',
    isLoading: false,
};

describe('Communities Reducer', () => {
    it('should return the initial state', () => {
        expect(communitiesReducer(initialState, {} as any)).toEqual(initialState);
    });

    it('should handle LOAD_COMMUNITIES_ATTEMPT', () => {
        expect(communitiesReducer(initialState, { type: CommunitiesActionType.LOAD_COMMUNITIES_ATTEMPT })).toEqual({
            ...initialState,
            isLoading: true,
        });
    });
    it('should handle LOAD_COMMUNITIES_SUCCESS', () => {
        expect(
            communitiesReducer(initialState, {
                type: CommunitiesActionType.LOAD_COMMUNITIES_SUCCESS,
                payload: userCommunities,
            }),
        ).toEqual({
            ...initialState,
            communities: {
                count: userCommunities.total_count,
                data: userCommunities.data,
            },
            errorMessage: '',
            isLoading: false,
        });
    });
    it('should handle LOAD_COMMUNITIES_ERROR ', () => {
        expect(
            communitiesReducer(initialState, {
                type: CommunitiesActionType.LOAD_COMMUNITIES_ERROR,
                payload: message.error,
            }),
        ).toEqual({
            ...initialState,
            errorMessage: message.error,
        });
    });
});
