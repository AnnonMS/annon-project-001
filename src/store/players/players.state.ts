import { Injectable } from '@angular/core';
import { Player } from '@app/modules/player';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as R from 'ramda';
import { ClearPlayers, PlayersSet, PlayerUpdateScore } from './players.actions';

export type PlayersStateModel = readonly Player[];
@State<PlayersStateModel>({
    name: 'players',
    defaults: [],
})
@Injectable()
export class PlayerState {
    @Selector()
    public static getState(state: PlayersStateModel) {
        return state;
    }

    @Action(PlayersSet)
    public createGame(
        { setState }: StateContext<PlayersStateModel>,
        { players: { playerOneName, playerTwoName } }: PlayersSet,
    ) {
        const players: readonly Player[] = [
            { name: playerOneName, score: 0 },
            { name: playerTwoName, score: 0 },
        ];
        setState(players);
    }

    @Action(ClearPlayers)
    public clearPlayers({ setState }: StateContext<PlayersStateModel>) {
        setState([]);
    }

    @Action(PlayerUpdateScore)
    public updateScore({ setState, getState }: StateContext<PlayersStateModel>, { playerIndex }: PlayerUpdateScore) {
        if (!getState().length) {
            return;
        }

        const scoreLens = R.lensPath([playerIndex, 'score']);
        const state = R.over(scoreLens, R.inc, getState());

        setState(state);
    }
}
