import { ActionType } from "../action-types";
import {  UpdateCellAction, DeleteCellAction, MoveCellAction, InsertCellBeforeAction, DirectionType } from "../actions";
import { CellTypes } from "../cell";

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