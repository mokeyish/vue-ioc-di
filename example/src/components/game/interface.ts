/**
 * Created by yish on 2020/06/01.
 */


export type SquareValue = 'X' | 'O' | null;

export type Squares = SquareValue[];


export interface GameState {
    history: {
        squares: Squares
    }[];
    stepNumber: number;
    xIsNext: boolean;
}
