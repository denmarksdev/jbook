import { produce } from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
    [key: string]: {
        isLoading: boolean,
        code: string,
        err: string
    } | undefined
}

const intialState: BundlesState = {}

const reducer = produce((state: BundlesState = intialState, action: Action): BundlesState => {
    switch (action.type) {
        case ActionType.BundlerStart:
            state[action.payload.cellId] = {
                isLoading: true,
                code: '',
                err: ''
            }
            return state;
        case ActionType.BundleComplete:
            state[action.payload.cellId] = {
                isLoading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err
            }
            return state
        default:
            return state
    }
}, intialState)


export default reducer;

