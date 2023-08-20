import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

export type DirectionType = "up" | "down";

export interface MoveCellAction {
    type: ActionType.MoveCell
    payload: {
        id: string;
        direction: DirectionType
    }
}

export interface DeleteCellAction {
    type: ActionType.DeleteCell;
    payload: string;
}

export interface InsertCellBeforeAction {
    type: ActionType.InserCellAfter
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

export interface BunlderStartAction {
    type: ActionType.BundlerStart,
    payload: {
        cellId: string;
    }
}

export interface BunlderCompletection {
    type: ActionType.BundleComplete,
    payload: {
        cellId: string;
        bundle: {
            code: string,
            err: string
        }
    }
}

export type Action =
    | MoveCellAction 
    | DeleteCellAction 
    | InsertCellBeforeAction 
    | UpdateCellAction 
    | BunlderStartAction
    | BunlderCompletection