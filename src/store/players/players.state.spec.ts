import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { RootState } from '@store/store.config';
import { ClearPlayers, PlayersSet, PlayerUpdateScore } from './players.actions';
import { PlayersStateModel, PlayerState } from './players.state';

describe('Player store', () => {
    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([PlayerState])],
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    it('should correctly set players', () => {
        const expected: PlayersStateModel = [
            { name: 'Foo', score: 0 },
            { name: 'Bar', score: 0 },
        ];

        store.dispatch(new PlayersSet({ playerOneName: 'Foo', playerTwoName: 'Bar' }));
        const actual = store.selectSnapshot(PlayerState.getState);
        expect(actual).toEqual(expected);
    });

    it('should correctly clear the players state', () => {
        const state: RootState = {
            ...store.snapshot(),
            player: [
                { name: 'Foo', score: 0 },
                { name: 'Bar', score: 0 },
            ],
        };

        store.reset(state);

        const expected: PlayersStateModel = [];
        store.dispatch(new ClearPlayers());
        const actual = store.selectSnapshot(PlayerState.getState);
        expect(actual).toEqual(expected);
    });

    describe('#UpdateScore', () => {
        it('should correctly update the score when players are set (multi player mode)', () => {
            const state: RootState = {
                ...store.snapshot(),
                players: [
                    { name: 'Foo', score: 0 },
                    { name: 'Bar', score: 0 },
                ],
            };

            store.reset(state);
            store.dispatch(new PlayerUpdateScore(1));

            const actual = store.selectSnapshot(PlayerState.getState);
            const expected: PlayersStateModel = [
                { name: 'Foo', score: 0 },
                { name: 'Bar', score: 1 },
            ];

            expect(actual).toEqual(expected);
        });

        it('should skip the score update when there were no players (single player mode)', () => {
            const state: RootState = {
                ...store.snapshot(),
                players: [],
            };

            store.reset(state);

            const expected: PlayersStateModel = [];
            store.dispatch(new PlayerUpdateScore(1));
            const actual = store.selectSnapshot(PlayerState.getState);
            expect(actual).toEqual(expected);
        });
    });
});
