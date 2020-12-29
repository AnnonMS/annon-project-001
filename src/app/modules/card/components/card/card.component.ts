import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '@app/modules/card';
import { isStartShipResource } from '@app/modules/game';
import { RoundState } from '../../types';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input() card!: Card;
    @Input() isRoundFinished!: boolean;
    @Output() readonly pickCard = new EventEmitter<void>();

    onPickCard() {
        this.pickCard.emit();
    }

    get title() {
        return this.card.resource?.name || '';
    }

    get subtitle() {
        if (!this.card.resource) {
            return '';
        }

        return isStartShipResource(this.card.resource)
            ? `Crew ${this.card.resource.crew}`
            : `Mass ${this.card.resource.mass}`;
    }

    get stateMessage() {
        switch (this.card.roundState) {
            case RoundState.WAITING_FOR_USER_ACTION:
                return 'To draw a random card, please click the play button';
            case RoundState.PENDING:
                return 'Waiting for the opponent to pick a card';
            case RoundState.DRAW:
                return 'Draw';
            case RoundState.WON:
                return 'Won';
            case RoundState.LOSE:
                return 'Lose';
            default:
                return 'Unknown State';
        }
    }

    get iconColor() {
        switch (this.card.roundState) {
            case RoundState.WON:
                return 'var(--success-color)';
            case RoundState.LOSE:
                return 'var(--danger-color)';
            default:
                return 'var(--accent-color)';
        }
    }

    get icon() {
        switch (this.card.roundState) {
            case RoundState.WAITING_FOR_USER_ACTION:
                return 'play_arrow';
            case RoundState.PENDING:
                return 'hourglass_bottom';
            case RoundState.DRAW:
                return 'trip_origin';
            case RoundState.WON:
                return 'done';
            case RoundState.LOSE:
                return 'clear';
            default:
                return undefined;
        }
    }
}
