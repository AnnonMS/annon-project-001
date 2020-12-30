import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GameFetchResourceRequested, ResetGame } from '@store/game/game.actions';
import { GameState, GameStateModel } from '@store/game/game.state';
import { ClearPlayers } from '@store/players/players.actions';
import { Observable } from 'rxjs';
import { GamePlayingResource, ResourceType } from '../..';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
    @Select(GameState.getState) readonly gameState$!: Observable<GameStateModel>;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.getRequiredResources();
    }

    getRequiredResources() {
        const { playingResourceType, resources } = this.store.selectSnapshot(GameState.getState);
        const isRandomMode = playingResourceType === GamePlayingResource.RANDOM;
        const isPeopleResourceRequired = playingResourceType === GamePlayingResource.PERSON || isRandomMode;
        const isStarShipResourceRequired = playingResourceType === GamePlayingResource.STARSHIP || isRandomMode;
        const { people, starships } = resources;

        // Only make the request when there is no resources already stored for the particular resource in local storage
        // as (ngxs/storage-plugin is keeping it with syncs with our state)

        if (isPeopleResourceRequired && !people.length) {
            this.store.dispatch(new GameFetchResourceRequested(ResourceType.PEOPLE));
        }

        if (isStarShipResourceRequired && !starships.length) {
            this.store.dispatch(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        }
    }

    onResetGame() {
        this.store.dispatch([new ResetGame(), new ClearPlayers()]);
    }
}
