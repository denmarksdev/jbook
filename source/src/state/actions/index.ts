import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

export type DirectionType  = "up" | "down";

export interface MoveCellAction {
    type: ActionType.MoveCell
    payload: {
        id: string;
        direction:  DirectionType
    }
}

export interface DeleteCellAction {
    type: ActionType.DeleteCell;
    payload: string;
}

export interface InsertCellBeforeAction {
    type: ActionType.InserCellBefore
    payload: {
        id: string | null,
        type: CellTypes
    }
}

export interface UpdateCellAction {
    type: ActionType.UpdateCell;
    payload: {
        id: string;
        content: string
    }
}

export type Action =
    MoveCellAction |
    DeleteCellAction |
    InsertCellBeforeAction |
    UpdateCellAction

