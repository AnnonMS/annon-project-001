import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { CardModule } from '@app/modules/card/card.module';
import { PlayerModule } from '@app/modules/player/player.module';
import { NgxsStoreModule } from '@store/store.module';
import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
    let component: GameBoardComponent;
    let fixture: ComponentFixture<GameBoardComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameBoardComponent],
            imports: [PlayerModule, CardModule, MatIconModule, NgxsStoreModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameBoardComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event on button click', async () => {
        spyOn(component.resetGame, 'emit');
        const buttonHarness = await loader.getHarness(
            MatButtonHarness.with({ selector: '[data-testid="reset-button"]' }),
        );
        await buttonHarness.click();
        expect(component.resetGame.emit).toHaveBeenCalled();
    });
});
