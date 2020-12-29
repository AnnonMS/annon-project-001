import { Component } from '@angular/core';
import { Game, isMultiPlayerGame } from '@app/modules/game';
import { Store } from '@ngxs/store';
import { StartGame } from '@store/game/game.actions';
import { PlayersSet } from '@store/players/players.actions';

@Component({
    templateUrl: './create-game.component.html',
})
export class CreateGameComponent {
    constructor(private store: Store) {}

    startGame(game: Game): void {
        this.store.dispatch(new StartGame(game));

        if (isMultiPlayerGame(game)) {
            this.store.dispatch(new PlayersSet({ playerOneName: game.playerOne, playerTwoName: game.playerTwo }));
        }
    }
}
