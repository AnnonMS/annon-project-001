import { Component, Input, OnDestroy } from '@angular/core';
import { GamePlayingResource } from '@app/modules/game';
import { Select, Store } from '@ngxs/store';
import { CardReset, CardsUpdate } from '@store/cards/cards.actions';
import { CardsState, CardsStateModel } from '@store/cards/cards.state';
import { GameStateResources } from '@store/game/game.state';
import { PlayerUpdateScore } from '@store/players/players.actions';
import { Observable } from 'rxjs';
import { Card, RoundState } from '../..';
import { CardsService } from '../../cards.service';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnDestroy {
    @Select(CardsState.getState) cardsState$!: Observable<CardsStateModel>;
    @Input() resourceType!: GamePlayingResource;
    @Input() resources!: GameStateResources;

    constructor(private store: Store, private cardService: CardsService) {}

    ngOnDestroy() {
        this.resetCards();
    }

    resetCards() {
        this.store.dispatch(new CardReset());
    }

    updateCardsState(cards: readonly Card[]) {
        this.store.dispatch(new CardsUpdate(cards));
    }

    awardsWinner(cards: readonly Card[]) {
        const winnerIndex = cards.findIndex(({ roundState }) => roundState === RoundState.WON);

        if (winnerIndex !== -1) {
            this.store.dispatch(new PlayerUpdateScore(winnerIndex));
        }
    }

    isRoundFinished(cards: readonly Card[]): boolean {
        return !!cards[0].resource && !!cards[1].resource;
    }

    identify(_index: number, card: Card) {
        return card.id;
    }

    pickRandomCard(index: number, cards: readonly Card[]): void {
        const randomCard = this.cardService.pickRandomCard(this.resources, this.resourceType, index, cards);
        const updatedCards = this.cardService.updatedCards(index, cards, randomCard);
        this.updateCardsState(updatedCards);
        this.awardsWinner(updatedCards);
    }
}
