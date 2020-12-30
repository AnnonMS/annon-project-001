import { Injectable } from '@angular/core';
import { GameMode, GamePlayingResource, GameService, People, StarShip } from '@app/modules/game';
import { Navigate } from '@ngxs/router-plugin';
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
    readonly isLoading: boolean;
    readonly playingResourceType: GamePlayingResource;
    readonly resources: GameStateResources;
    readonly mode: GameMode;
    readonly error: string | null;
};

const initialState: GameStateModel = {
    isPlaying: false,
    isLoading: false,
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
    defaults: initialState,
})
@Injectable()
export class GameState {
    constructor(private gameService: GameService) {}

    @Selector()
    public static getState(state: GameStateModel) {
        return state;
    }

    @Selector()
    public static isPlaying(state: GameStateModel): boolean {
        return state.isPlaying;
    }

    @Action(StartGame)
    public createGame(
        { patchState, dispatch }: StateContext<GameStateModel>,
        { game: { playingResourceType: resource, mode } }: StartGame,
    ) {
        patchState({ playingResourceType: resource, mode, isPlaying: true });
        dispatch(new Navigate(['']));
    }

    @Action(ResetGame)
    public resetGame({ patchState, dispatch }: StateContext<GameStateModel>) {
        patchState({ isPlaying: false, error: null });
        dispatch(new Navigate(['create-game']));
    }

    @Action(GameFetchResourceRequested)
    public fetchResourceRequested(
        { dispatch, patchState }: StateContext<GameStateModel>,
        { resourceType }: GameFetchResourceRequested,
    ) {
        patchState({ isLoading: true });

        this.gameService
            .fetchResources(resourceType)
            .then((resource) => dispatch(new GameFetchResourceSucceeded({ resource, resourceType })))
            .catch((error: string) => dispatch(new GameFetchResourceFailed(error)));
    }

    @Action(GameFetchResourceSucceeded)
    public fetchResourceSucceeded(
        { setState, getState }: StateContext<GameStateModel>,
        { payload: { resource, resourceType } }: GameFetchResourceSucceeded,
    ) {
        const state = R.pipe(
            R.set(R.lensPath(['resources', resourceType]), resource),
            R.set(R.lensPath(['error']), null),
            R.set(R.lensPath(['isLoading']), false),
        )(getState());

        setState(state);
    }

    @Action(GameFetchResourceFailed)
    public fetchResourceFailed({ patchState }: StateContext<GameStateModel>, { error }: GameFetchResourceFailed) {
        patchState({ error, isLoading: false });
    }
}
