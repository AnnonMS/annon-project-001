import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { RootState } from '@store/store.config';
import { NgxsStoreModule } from '@store/store.module';
import { PlayerComponent } from '../../components/player/player.component';
import { PlayersComponent } from './players.component';

describe('PlayersComponent', () => {
    let component: PlayersComponent;
    let fixture: ComponentFixture<PlayersComponent>;
    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayersComponent, PlayerComponent],
            imports: [NgxsStoreModule, HttpClientTestingModule, CommonModule],
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayersComponent);
        component = fixture.componentInstance;
        const state: RootState = {
            ...store.snapshot(),
            player: [
                { name: 'Foo', score: 0 },
                { name: 'Bar', score: 0 },
            ],
        };

        store.reset(state);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
