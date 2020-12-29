import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngxs/store';
import { ResetGame } from '@store/game/game.actions';
import { ClearPlayers } from '@store/players/players.actions';
import { NgxsStoreModule } from '@store/store.module';
import { GameModule } from '../../game.module';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;
    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameComponent],
            imports: [GameModule, NgxsStoreModule, BrowserAnimationsModule],
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('onResetGame', () => {
        spyOn(store, 'dispatch').withArgs([new ResetGame(), new ClearPlayers()]);
        component.onResetGame();
        // the store action itself are tested in src/store modules
        expect(store.dispatch).toHaveBeenCalled();
    });
});
