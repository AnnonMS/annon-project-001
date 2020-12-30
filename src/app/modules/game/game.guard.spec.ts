import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { RootState } from '@store/store.config';
import { NgxsStoreModule } from '@store/store.module';
import { GameGuard } from './game.guard';

describe('GameGuard', () => {
    let guard: GameGuard;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsStoreModule, RouterTestingModule, HttpClientTestingModule],
        });
        guard = TestBed.inject(GameGuard);
        store = TestBed.inject(Store);
    });

    it('should be created', () => {
        expect(guard.canActivate()).toBeTruthy();
    });

    it('should grants route access', () => {
        const state: RootState = {
            ...store.snapshot(),
            game: {
                ...store.snapshot().game,
                isPlaying: true,
            },
        };
        store.reset(state);

        expect(guard.canActivate()).toBeTruthy();
    });

    it('should not grant route access, and redirect to root page', () => {
        spyOn(store, 'dispatch');

        const state: RootState = {
            ...store.snapshot(),
            game: {
                ...store.snapshot().game,
                isPlaying: false,
            },
        };
        store.reset(state);

        expect(guard.canActivate()).toBeTruthy();
        expect(store.dispatch).toHaveBeenCalledWith(new Navigate(['create-game']));
    });
});
