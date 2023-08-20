import { produce } from 'immer';
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell';

export interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    }
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
        case ActionType.UpdateCell:
            const { id, content } = action.payload;

            state.data[id].content = content;
            
            return state;
        case ActionType.DeleteCell:
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);

            return state;
        case ActionType.MoveCell:
            const { direction } = action.payload;
            const index = state.order.findIndex((id) => id === action.payload.id)
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state;
            }

            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;

            return state;
        case ActionType.InserCellBefore:
            const cell: Cell = {
                content: '',
                type: action.payload.type,
                id: randomId()
            }

            state.data[cell.id] = cell;

            const foundIndex = state.order.findIndex(id => id === action.payload.id);
            if (foundIndex - 1) {
                state.order.push(cell.id);
            }
            else {
                state.order.splice(foundIndex, 0, cell.id);
            }

            return state;
        default:
            return state;
    }
}, initialState)

const randomId = () => {
    return Math.random().toString(36).substring(2, 5);
}

export default reducer;