import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameMode, GamePlayingResource, MultiPlayerGame, ResourceType, SinglePlayerGame } from '@app/modules/game';
import { Store } from '@ngxs/store';
import { GameFetchResourceRequested, StartGame } from '@store/game/game.actions';
import { GameStateModel } from '@store/game/game.state';
import { PlayersSet } from '@store/player/player.actions';
import { CreateGameComponent } from './create-game.component';

describe('CreateGameComponent', () => {
    let component: CreateGameComponent;
    let fixture: ComponentFixture<CreateGameComponent>;
    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateGameComponent],
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
        const gameState: GameStateModel = {
            isPlaying: true,
            isLoading: false,
            resources: {
                people: [],
                starships: [],
            },
            error: null,
            mode: GameMode.MULTI_PLAYER,
            playingResourceType: GamePlayingResource.RANDOM,
        };

        it('should start a single player game and fetch only API resources for people', () => {
            spyOn(store, 'dispatch');
            const game: SinglePlayerGame = {
                mode: GameMode.SINGLE_PLAYER,
                playingResourceType: GamePlayingResource.PERSON,
            };
            component.startGame(game);
            expect(store.dispatch).toHaveBeenCalledWith(new StartGame(game));
            expect(store.dispatch).toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        });

        it('should start a single player game and fetch only API resources for starships', () => {
            spyOn(store, 'dispatch');
            const game: SinglePlayerGame = {
                mode: GameMode.SINGLE_PLAYER,
                playingResourceType: GamePlayingResource.STARSHIP,
            };
            component.startGame(game);
            expect(store.dispatch).toHaveBeenCalledWith(new StartGame(game));
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
            expect(store.dispatch).toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        });

        it('should start a single player game with random mode and fetch both API resources for starships and people', () => {
            spyOn(store, 'dispatch');
            const game: SinglePlayerGame = {
                mode: GameMode.SINGLE_PLAYER,
                playingResourceType: GamePlayingResource.RANDOM,
            };
            component.startGame(game);
            expect(store.dispatch).toHaveBeenCalledWith(new StartGame(game));
            expect(store.dispatch).toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
            expect(store.dispatch).toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        });

        it('should start a single player game and not fetch anything as we already have the values in storage', () => {
            spyOn(store, 'dispatch');
            const game: SinglePlayerGame = {
                mode: GameMode.SINGLE_PLAYER,
                playingResourceType: GamePlayingResource.RANDOM,
            };
            component.startGame(game);
            expect(store.dispatch).toHaveBeenCalledWith(new StartGame(game));
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        });

        it('should start a multiplayer game and not fetch anything as we already have the values in storage', () => {
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
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        });
    });
});
