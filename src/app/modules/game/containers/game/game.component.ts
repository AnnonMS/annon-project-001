import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetRequiredResources, ResetGame } from '@store/game/game.actions';
import { GameState, GameStateModel } from '@store/game/game.state';
import { ClearPlayers } from '@store/players/players.actions';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
    @Select(GameState.getState) readonly gameState$!: Observable<GameStateModel>;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(GetRequiredResources);
    }

    onResetGame() {
        this.store.dispatch([new ResetGame(), new ClearPlayers()]);
    }
}
