import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GameMode, GamePlayingResource, ResourceType, SinglePlayerGame } from '@app/modules/game';
import { GameService } from '@app/modules/game/game.service';
import { DARTH_VADER_MOCK, mockPeopleResource, mockStarShipResource } from '@mocks/resource.mock';
import { NgxsModule, Store } from '@ngxs/store';
import { RootState } from '@store/store.config';
import {
    GameFetchResourceFailed,
    GameFetchResourceRequested,
    GameFetchResourceSucceeded,
    ResetGame,
    StartGame,
} from './game.actions';
import { GameState, GameStateModel } from './game.state';

describe('Game store', () => {
    let store: Store;
    let gameService: GameService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([GameState]), HttpClientTestingModule],
        }).compileComponents();
        store = TestBed.inject(Store);
        gameService = TestBed.inject(GameService);
    });

    it('should dispatch an "StartGame" action and start a game with form settings', () => {
        const state: RootState = {
            ...store.snapshot(),
            game: {
                ...store.snapshot().game,
                isPlaying: false,
                mode: GameMode.MULTI_PLAYER,
                playingResourceType: GamePlayingResource.STARSHIP,
            },
        };
        store.reset(state);

        const game: SinglePlayerGame = {
            mode: GameMode.SINGLE_PLAYER,
            playingResourceType: GamePlayingResource.PERSON,
        };

        const expected: GameStateModel = {
            ...state.game,
            isPlaying: true,
            mode: GameMode.SINGLE_PLAYER,
            playingResourceType: GamePlayingResource.PERSON,
        };

        store.dispatch(new StartGame(game));
        const actual = store.selectSnapshot(GameState.getState);
        expect(actual).toEqual(expected);
    });

    it('should dispatch an "ResetGame" action to change playing state to false', () => {
        const state: RootState = { ...store.snapshot(), game: { ...store.snapshot().game, isPlaying: true } };
        store.reset(state);
        const expected: GameStateModel = { ...state.game, isPlaying: false };

        store.dispatch(new ResetGame());
        const actual = store.selectSnapshot(GameState.getState);
        expect(actual).toEqual(expected);
    });

    it('should dispatch an "GameFetchResourceSucceeded" action to set the api resources', () => {
        store.dispatch([
            new GameFetchResourceSucceeded({ resource: mockPeopleResource, resourceType: ResourceType.PEOPLE }),
            new GameFetchResourceSucceeded({ resource: mockStarShipResource, resourceType: ResourceType.STAR_SHIPS }),
        ]);
        const actual = store.selectSnapshot(GameState.getState).resources;
        expect(actual).toEqual({ people: mockPeopleResource, starships: mockStarShipResource });
    });

    it('should dispatch an "FetchResourceFailed" action to set an error message', () => {
        const error = new HttpErrorResponse({
            error: {
                headers: {},
                status: 0,
                statusText: 'Unknown Error',
                url: 'https://swapiZ.dev/api/people',
                ok: false,
                name: 'HttpErrorResponse',
                message: 'Http failure response for https://swapi.dev/api/people',
                error: {
                    isTrusted: true,
                },
            },
        });

        store.dispatch(new GameFetchResourceFailed(error));
        const actual = store.selectSnapshot(GameState.getState).error;
        expect(actual).toEqual(error);
    });

    describe('GameFetchResourceRequested', () => {
        it('should dispatch an "GameFetchResourceRequested" action and then save the resources on success', (done: DoneFn) => {
            spyOn(gameService, 'fetchResources').and.resolveTo([DARTH_VADER_MOCK]);
            spyOn(store, 'dispatch').and.callThrough();

            store.dispatch(new GameFetchResourceRequested(ResourceType.PEOPLE)).subscribe(() => {
                expect(gameService.fetchResources).toHaveBeenCalledWith(ResourceType.PEOPLE);
                done();
            });
        });

        it('should dispatch an "GameFetchResourceRequested" action and then save the failed response on error', (done: DoneFn) => {
            spyOn(gameService, 'fetchResources').and.rejectWith({ message: 'error' });
            store.dispatch(new GameFetchResourceRequested(ResourceType.STAR_SHIPS)).subscribe(() => {
                expect(gameService.fetchResources).toHaveBeenCalledWith(ResourceType.STAR_SHIPS);
                done();
            });
        });
    });
});
