import { ApiResource } from '@app/modules/game/models';

export type CardID = string;

/* eslint-disable @typescript-eslint/naming-convention */
export enum RoundState {
    DRAW = 'draw',
    WON = 'won',
    LOSE = 'lose',
    PENDING = 'pending',
    WAITING_FOR_USER_ACTION = 'waiting',
}

export type Card = {
    readonly id: CardID;
    readonly resource: ApiResource | null;
    readonly roundState: RoundState;
};
