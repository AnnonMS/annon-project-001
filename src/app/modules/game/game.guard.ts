import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { GameState } from '@store/game/game.state';

@Injectable({
    providedIn: 'root',
})
export class GameGuard implements CanActivate {
    constructor(private store: Store) {}
    canActivate(): UrlTree | boolean {
        const isPlaying = this.store.selectSnapshot(GameState.isPlaying);
        if (!isPlaying) {
            this.store.dispatch(new Navigate(['create-game']));
        }
        return true;
    }
}
