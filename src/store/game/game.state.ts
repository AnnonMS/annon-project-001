import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameMode, GamePlayingResource, GameService, People, StarShip } from '@app/modules/game';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as R from 'ramda';
import {
    GameFetchResourceFailed,
    GameFetchResourceRequested,
    GameFetchResourceSucceeded,
    ResetGame,
    StartGame,
} from './game.actions';

export type GameStateResources = {
    readonly people: readonly People[];
    readonly starships: readonly StarShip[];
};

export type GameStateModel = {
    readonly isPlaying: boolean;
    readonly playingResourceType: GamePlayingResource;
    readonly resources: GameStateResources;
    readonly mode: GameMode;
    readonly error: HttpErrorResponse | null;
};

export const initialGameState: GameStateModel = {
    isPlaying: false,
    resources: {
        people: [],
        starships: [],
    },
    error: null,
    mode: GameMode.SINGLE_PLAYER,
    playingResourceType: GamePlayingResource.RANDOM,
};
@State<GameStateModel>({
    name: 'game',
    defaults: initialGameState,
})
@Injectable()
export class GameState {
    constructor(private gameService: GameService) {}

    @Selector()
    public static getState(state: GameStateModel) {
        return state;
    }

    @Action(StartGame)
    public createGame(
        { patchState }: StateContext<GameStateModel>,
        { game: { playingResourceType: resource, mode } }: StartGame,
    ) {
        patchState({ playingResourceType: resource, mode, isPlaying: true });
    }

    @Action(ResetGame)
    public resetGame({ patchState }: StateContext<GameStateModel>) {
        patchState({ isPlaying: false, error: null });
    }

    @Action(GameFetchResourceRequested)
    public fetchResourceRequested(
        { dispatch }: StateContext<GameStateModel>,
        { resourceType }: GameFetchResourceRequested,
    ) {
        this.gameService
            .fetchResources(resourceType)
            .then((resource) => dispatch(new GameFetchResourceSucceeded({ resource, resourceType })))
            .catch((error: HttpErrorResponse) => dispatch(new GameFetchResourceFailed(error)));
    }

    @Action(GameFetchResourceSucceeded)
    public fetchResourceSucceeded(
        { setState, getState }: StateContext<GameStateModel>,
        { payload: { resource, resourceType } }: GameFetchResourceSucceeded,
    ) {
        const state = R.pipe(
            R.set(R.lensPath(['resources', resourceType]), resource),
            R.set(R.lensPath(['error']), null),
        )(getState());

        setState(state);
    }

    @Action(GameFetchResourceFailed)
    public fetchResourceFailed({ patchState }: StateContext<GameStateModel>, { error }: GameFetchResourceFailed) {
        patchState({ error });
    }
}
