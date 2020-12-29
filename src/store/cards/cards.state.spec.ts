/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Card, RoundState } from '@app/modules/card';
import { DARTH_VADER_MOCK } from '@mocks/resource.mock';
import { NgxsModule, Store } from '@ngxs/store';
import { RootState } from '@store/store.config';
import { CardReset, CardsUpdate } from './cards.actions';
import { CardsState } from './cards.state';

describe('Cards store', () => {
    let store: Store;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([CardsState]), HttpClientTestingModule],
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
});
