import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameMode, GamePlayingResource, MultiPlayerGame, SinglePlayerGame } from '@app/modules/game';
import { Store } from '@ngxs/store';
import { StartGame } from '@store/game/game.actions';
import { PlayersSet } from '@store/players/players.actions';
import { NgxsStoreModule } from '@store/store.module';
import { CreateGameComponent } from './create-game.component';

describe('CreateGameComponent', () => {
    let component: CreateGameComponent;
    let fixture: ComponentFixture<CreateGameComponent>;
    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateGameComponent],
            imports: [NgxsStoreModule, RouterTestingModule],
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('#startGame', () => {
        it('should start a single player', () => {
            spyOn(store, 'dispatch');
            const game: SinglePlayerGame = {
                mode: GameMode.SINGLE_PLAYER,
                playingResourceType: GamePlayingResource.PERSON,
            };
            component.startGame(game);
            expect(store.dispatch).toHaveBeenCalledWith(new StartGame(game));
        });

        it('should start a multiplayer game', () => {
            spyOn(store, 'dispatch');
            const game: MultiPlayerGame = {
                mode: GameMode.MULTI_PLAYER,
                playingResourceType: GamePlayingResource.PERSON,
                playerOne: 'Foo',
                playerTwo: 'Bar',
            };
            component.startGame(game);
            expect(store.dispatch).toHaveBeenCalledWith(new StartGame(game));
            expect(store.dispatch).toHaveBeenCalledWith(new PlayersSet({ playerOneName: 'Foo', playerTwoName: 'Bar' }));
        });
    });
});
