/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/material/material.module';
import { GamePlayingResource } from '@app/modules/game';
import { SharedModule } from '@app/shared/shared.module';
import { DARTH_VADER_MOCK, MILLENNIUM_FALCON, mockPeopleResource } from '@mocks/resource.mock';
import { Store } from '@ngxs/store';
import { CardReset, CardsUpdate } from '@store/cards/cards.actions';
import { PlayerUpdateScore } from '@store/players/players.actions';
import { NgxsStoreModule } from '@store/store.module';
import { Card, RoundState } from '../..';
import { CardComponent } from '../../components/card/card.component';
import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
    let component: CardsComponent;
    let fixture: ComponentFixture<CardsComponent>;
    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardsComponent, CardComponent],
            imports: [NgxsStoreModule, MaterialModule, SharedModule, HttpClientTestingModule, RouterTestingModule],
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch an "CardReset" action on clicking the play button', () => {
        spyOn(store, 'dispatch');
        component.resetCards();
        // the store action itself is tested in src/store/cards/cards.state.spec.ts
        expect(store.dispatch).toHaveBeenCalledWith(new CardReset());
    });

    it('should dispatch an "CardReset" action in OnDestroy lifecycle', () => {
        spyOn(store, 'dispatch');
        component.ngOnDestroy();
        // the store action itself is tested in src/store/cards/cards.state.spec.ts
        expect(store.dispatch).toHaveBeenCalledWith(new CardReset());
    });

    it('should update the store state when player picks a card', () => {
        component.resources = { people: mockPeopleResource, starships: [] };
        component.resourceType = GamePlayingResource.PERSON;

        spyOn(component, 'updateCardsState');

        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
        ];

        component.pickRandomCard(0, cards);

        expect(component.updateCardsState).toHaveBeenCalled();
    });

    it('should correctly dispatch "CardsUpdate" action', () => {
        spyOn(store, 'dispatch');
        spyOn(component, 'awardsWinner');

        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.DRAW, resource: MILLENNIUM_FALCON },
            { id: '002', roundState: RoundState.DRAW, resource: MILLENNIUM_FALCON },
        ];

        component.updateCardsState(cards);
        // the store action itself is tested in src/store/cards/cards.state.spec.ts
        expect(store.dispatch).toHaveBeenCalledWith(new CardsUpdate(cards));
    });

    it('should correctly dispatch "CardsUpdate" action', () => {
        spyOn(store, 'dispatch');
        spyOn(component, 'awardsWinner');

        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.WON, resource: { ...MILLENNIUM_FALCON, crew: '1,000' } },
            { id: '002', roundState: RoundState.DRAW, resource: { ...MILLENNIUM_FALCON, crew: '800' } },
        ];

        component.updateCardsState(cards);
        // the store action itself is tested in src/store/cards/cards.state.spec.ts
        expect(store.dispatch).toHaveBeenCalledWith(new CardsUpdate(cards));
    });

    it('should correctly dispatch "CardsUpdate" action', () => {
        spyOn(store, 'dispatch');

        const cards: readonly Card[] = [
            { id: '001', roundState: RoundState.DRAW, resource: MILLENNIUM_FALCON },
            { id: '002', roundState: RoundState.DRAW, resource: MILLENNIUM_FALCON },
        ];

        component.updateCardsState(cards);
        // the store action itself is tested in src/store/cards/cards.state.spec.ts
        expect(store.dispatch).toHaveBeenCalledWith(new CardsUpdate(cards));
    });

    describe('.isRoundFinished', () => {
        it('should correctly determinate that round was finished', () => {
            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.DRAW, resource: DARTH_VADER_MOCK },
                { id: '001', roundState: RoundState.DRAW, resource: DARTH_VADER_MOCK },
            ];

            const actual = component.isRoundFinished(cards);
            expect(actual).toBe(true);
        });

        it('should correctly determinate that round was not finished', () => {
            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.PENDING, resource: DARTH_VADER_MOCK },
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            ];

            const actual = component.isRoundFinished(cards);
            expect(actual).toBe(false);
        });

        it('should correctly determinate that round was not finished', () => {
            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
                { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
            ];

            const actual = component.isRoundFinished(cards);
            expect(actual).toBe(false);
        });
    });

    describe('.awardsWinner', () => {
        it('should correctly award winning first player', () => {
            spyOn(store, 'dispatch');

            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.WON, resource: { ...DARTH_VADER_MOCK, mass: '60' } },
                { id: '002', roundState: RoundState.LOSE, resource: { ...DARTH_VADER_MOCK, mass: '40' } },
            ];

            component.awardsWinner(cards);

            expect(store.dispatch).toHaveBeenCalledWith(new PlayerUpdateScore(0));
        });

        it('should correctly award winning second player', () => {
            spyOn(store, 'dispatch');

            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.LOSE, resource: { ...DARTH_VADER_MOCK, mass: '40' } },
                { id: '002', roundState: RoundState.WON, resource: { ...DARTH_VADER_MOCK, mass: '60' } },
            ];

            component.awardsWinner(cards);

            expect(store.dispatch).toHaveBeenCalledWith(new PlayerUpdateScore(1));
        });

        it('should correctly determinate that game ended in a draw and not give points to anyone', () => {
            spyOn(store, 'dispatch');

            const cards: readonly Card[] = [
                { id: '001', roundState: RoundState.DRAW, resource: DARTH_VADER_MOCK },
                { id: '002', roundState: RoundState.DRAW, resource: DARTH_VADER_MOCK },
            ];

            component.awardsWinner(cards);

            expect(store.dispatch).not.toHaveBeenCalledWith(new PlayerUpdateScore(1));
            expect(store.dispatch).not.toHaveBeenCalledWith(new PlayerUpdateScore(0));
        });
    });
});
