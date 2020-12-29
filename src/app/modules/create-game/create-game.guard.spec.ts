import { TestBed } from '@angular/core/testing';
import { CreateGameGuard } from './create-game.guard';

describe('CreateGameGuard', () => {
    let guard: CreateGameGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CreateGameGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
