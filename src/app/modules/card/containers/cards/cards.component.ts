import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CardReset, GetRandomResource } from '@store/cards/cards.actions';
import { CardsState, CardsStateModel } from '@store/cards/cards.state';
import { Observable } from 'rxjs';
import { Card } from '../..';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnDestroy {
    @Select(CardsState.getState) cardsState$!: Observable<CardsStateModel>;

    constructor(private store: Store) {}

    ngOnDestroy() {
        this.resetCards();
    }

    resetCards() {
        this.store.dispatch(new CardReset());
    }

    isRoundFinished(cards: readonly Card[]): boolean {
        return !!cards[0].resource && !!cards[1].resource;
    }

    identify(_index: number, card: Card) {
        return card.id;
    }

    pickRandomResource(index: number): void {
        this.store.dispatch(new GetRandomResource(index));
    }
}
