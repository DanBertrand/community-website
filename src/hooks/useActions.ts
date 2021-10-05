// import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store';
import { store } from '../store/store';

export const useActions = (): typeof actionCreators => {
    return bindActionCreators(actionCreators, store.dispatch);
};
