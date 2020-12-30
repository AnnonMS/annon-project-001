import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPeopleResource, mockStarShipResource } from '@mocks/resource.mock';
import { Store } from '@ngxs/store';
import { GameFetchResourceRequested, ResetGame } from '@store/game/game.actions';
import { ClearPlayers } from '@store/players/players.actions';
import { RootState } from '@store/store.config';
import { NgxsStoreModule } from '@store/store.module';
import { GameMode, GamePlayingResource, ResourceType } from '../..';
import { GameModule } from '../../game.module';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;
    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameComponent],
            imports: [
                GameModule,
                NgxsStoreModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
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

    it('onResetGame', () => {
        spyOn(store, 'dispatch').withArgs([new ResetGame(), new ClearPlayers()]);
        component.onResetGame();
        // the store action itself are tested in src/store modules
        expect(store.dispatch).toHaveBeenCalled();
    });

    describe('getRequiredResources', () => {
        let baseRootState: RootState;

        it('should start a single player game and fetch only API resources for people', () => {
            spyOn(store, 'dispatch');

            const state: RootState = {
                ...store.snapshot(),
                game: {
                    ...store.snapshot().game,
                    isPlaying: true,
                    mode: GameMode.SINGLE_PLAYER,
                    playingResourceType: GamePlayingResource.PERSON,
                    resources: { people: [], starships: [] },
                },
            };

            store.reset(state);
            component.getRequiredResources();
            expect(store.dispatch).toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
        });

        it('should start a single player game and fetch only API resources for starships', () => {
            spyOn(store, 'dispatch');
            const state: RootState = {
                ...store.snapshot(),
                game: {
                    ...store.snapshot().game,
                    isPlaying: true,
                    mode: GameMode.SINGLE_PLAYER,
                    playingResourceType: GamePlayingResource.STARSHIP,
                    resources: { people: [], starships: [] },
                },
            };
            store.reset(state);
            component.getRequiredResources();
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
            expect(store.dispatch).toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        });

        it('should start a single player game with random mode and fetch both API resources for starships and people', () => {
            spyOn(store, 'dispatch');
            const state: RootState = {
                ...store.snapshot(),
                game: {
                    ...store.snapshot().game,
                    isPlaying: true,
                    mode: GameMode.SINGLE_PLAYER,
                    playingResourceType: GamePlayingResource.RANDOM,
                    resources: { people: [], starships: [] },
                },
            };
            store.reset(state);
            component.getRequiredResources();
            expect(store.dispatch).toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
            expect(store.dispatch).toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        });

        it('should start a single player game and not fetch anything as we already have the values in storage', () => {
            spyOn(store, 'dispatch');
            const state: RootState = {
                ...store.snapshot(),
                game: {
                    ...store.snapshot().game,
                    isPlaying: true,
                    mode: GameMode.SINGLE_PLAYER,
                    playingResourceType: GamePlayingResource.RANDOM,
                    resources: { people: mockPeopleResource, starships: mockStarShipResource },
                },
            };
            store.reset(state);
            component.getRequiredResources();
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.PEOPLE));
            expect(store.dispatch).not.toHaveBeenCalledWith(new GameFetchResourceRequested(ResourceType.STAR_SHIPS));
        });
    });
});
