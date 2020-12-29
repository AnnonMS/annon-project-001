import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GamePlayingResource } from '@app/modules/game';
import { GameStateResources } from '@store/game/game.state';

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent {
    @Input() resourceType!: GamePlayingResource;
    @Input() resources!: GameStateResources;
    @Output() readonly resetGame = new EventEmitter<void>();

    onResetGame() {
        this.resetGame.emit();
    }
}
