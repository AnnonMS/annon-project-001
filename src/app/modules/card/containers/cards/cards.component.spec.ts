/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { DARTH_VADER_MOCK } from '@mocks/resource.mock';
import { Store } from '@ngxs/store';
import { CardReset, GetRandomResource } from '@store/cards/cards.actions';
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

    it('should dispatch an "CardReset" action in OnDestroy lifecycle', () => {
        spyOn(store, 'dispatch');
        component.pickRandomResource(1);
        // the store action itself is tested in src/store/cards/cards.state.spec.ts
        expect(store.dispatch).toHaveBeenCalledWith(new GetRandomResource(1));
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
});
