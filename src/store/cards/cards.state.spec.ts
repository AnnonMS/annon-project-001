/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Card, RoundState } from '@app/modules/card';
import { GameMode, GamePlayingResource } from '@app/modules/game';
import { DARTH_VADER_MOCK, mockPeopleResource, mockStarShipResource } from '@mocks/resource.mock';
import { NgxsModule, Store } from '@ngxs/store';
import { GameState } from '@store/game/game.state';
import { PlayerState } from '@store/players/players.state';
import { RootState } from '@store/store.config';
import { NgxsStoreModule } from '@store/store.module';
import { CardReset, CardsUpdate, GetRandomResource } from './cards.actions';
import { CardsState } from './cards.state';

describe('Cards store', () => {
    let store: Store;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([CardsState, GameState, PlayerState]),
                HttpClientTestingModule,
                NgxsStoreModule,
                RouterTestingModule,
            ],
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    it('should correctly dispatch an "CardsUpdate" action to set the state', () => {
        const state: RootState = {
            ...store.snapshot(),
            cards: [
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
                { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            ],
        };
        store.reset(state);

        const expected: readonly Card[] = [
            { id: '001', roundState: RoundState.PENDING, resource: DARTH_VADER_MOCK },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: DARTH_VADER_MOCK },
        ];

        store.dispatch(new CardsUpdate(expected));
        const actual = store.selectSnapshot(CardsState.getState);
        expect(actual).toEqual(expected);
    });

    it('should correctly dispatch an "CardReset" action to reset the state to its initial values', () => {
        const state: RootState = {
            ...store.snapshot(),
            cards: [
                { id: '001', roundState: RoundState.PENDING, resource: DARTH_VADER_MOCK },
                { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: DARTH_VADER_MOCK },
            ],
        };
        store.reset(state);

        const expected: readonly Card[] = [
            { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        store.dispatch(new CardReset());
        const actual = store.selectSnapshot(CardsState.getState);
        expect(actual).toEqual(expected);
    });

    it('should correctly dispatch an "CardReset" action to reset the state to its initial values', () => {
        const state: RootState = {
            ...store.snapshot(),
            game: {
                ...store.snapshot().game,
                mode: GameMode.SINGLE_PLAYER,
                playingResourceType: GamePlayingResource.PERSON,
                resources: {
                    person: mockPeopleResource,
                    starships: mockStarShipResource,
                },
            },
            cards: [
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
                { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            ],
        };
        store.reset(state);

        store.dispatch(new GetRandomResource(0));
        const actual = store.selectSnapshot(CardsState.getState);
        expect(actual[0].resource).toBeDefined();
    });

    it('should correctly give points to winning Card when 2nd card was picked and winner was determinate', () => {
        const state: RootState = {
            ...store.snapshot(),
            game: {
                ...store.snapshot().game,
                mode: GameMode.MULTI_PLAYER,
                playingResourceType: GamePlayingResource.PERSON,
                resources: {
                    people: [
                        { ...DARTH_VADER_MOCK, mass: '100' },
                        { ...DARTH_VADER_MOCK, mass: '200' },
                    ],
                    starships: mockStarShipResource,
                },
            },
            cards: [
                { id: '001', roundState: RoundState.PENDING, resource: { ...DARTH_VADER_MOCK, mass: '7' } },
                { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            ],
            players: [
                { name: 'Foo', score: 0 },
                { name: 'Bar', score: 0 },
            ],
        };
        store.reset(state);

        store.dispatch(new GetRandomResource(1));

        const actual = store.selectSnapshot(PlayerState.getState);

        expect(actual).toEqual([
            { name: 'Foo', score: 0 },
            { name: 'Bar', score: 1 },
        ]);
    });
});
