import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { UpdateCellAction, DeleteCellAction, MoveCellAction, InsertCellBeforeAction, DirectionType, Action } from "../actions";
import { CellTypes } from "../cell";
import bundler from "../../bundler";

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UpdateCell,
        payload: {
            id,
            content
        }
    }
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DeleteCell,
        payload: id
    }

};

export const moveCell = (id: string, direction: DirectionType): MoveCellAction => {
    return {
        type: ActionType.MoveCell,
        payload: {
            id,
            direction
        }
    }
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellBeforeAction => {
    return {
        type: ActionType.InserCellAfter,
        payload: {
            id,
            type: cellType
        }
    }
};

export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BundlerStart,
            payload: {
                cellId,
            }
        })

        const result = await bundler(input);

        dispatch({
            type: ActionType.BundleComplete,
            payload: {
                cellId,
                bundle: {
                    code: result.code,
                    err: result.err
                }
            }
        })
    }
}