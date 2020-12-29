import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GamePlayingResource } from '@app/modules/game';
import { ActionsExecuting } from '@ngxs-labs/actions-executing';
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
    @Input() isLoading!: ActionsExecuting;
    @Input() error!: HttpErrorResponse | null;
    @Output() readonly resetGame = new EventEmitter<void>();

    onResetGame() {
        this.resetGame.emit();
    }
}
