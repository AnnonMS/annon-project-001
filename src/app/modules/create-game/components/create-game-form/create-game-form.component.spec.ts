import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/material/material.module';
import { GameMode, GamePlayingResource } from '@app/modules/game';
import { CreateGameFormComponent } from './create-game-form.component';

describe('CreateGameFormComponent', () => {
    let component: CreateGameFormComponent;
    let loader: HarnessLoader;
    let fixture: ComponentFixture<CreateGameFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateGameFormComponent],
            imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateGameFormComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Form field - resources', () => {
        let selectHarness: MatSelectHarness;

        beforeEach(async () => {
            selectHarness = await loader.getHarness(
                MatSelectHarness.with({ selector: '[data-testid="select-resource"]' }),
            );
        });

        it('should contains dropdown with 3 resources', async () => {
            await selectHarness.open();
            const optionHarness = await selectHarness.getOptions();
            expect(optionHarness.length).toBe(3);
        });

        it('should be able to select Person value', async () => {
            await selectHarness.open();
            await selectHarness.clickOptions({ text: GamePlayingResource.PERSON });
            expect(await selectHarness.getValueText()).toBe(GamePlayingResource.PERSON);
        });

        it('should be able to select StarShip value', async () => {
            await selectHarness.open();
            await selectHarness.clickOptions({ text: GamePlayingResource.STARSHIP });
            expect(await selectHarness.getValueText()).toBe(GamePlayingResource.STARSHIP);
        });

        it('should be able to select random value', async () => {
            await selectHarness.open();
            await selectHarness.clickOptions({ text: GamePlayingResource.RANDOM });
            expect(await selectHarness.getValueText()).toBe(GamePlayingResource.RANDOM);
        });
    });

    describe('Form field - mode', () => {
        let selectHarness: MatSelectHarness;

        beforeEach(async () => {
            selectHarness = await loader.getHarness(MatSelectHarness.with({ selector: '[data-testid="select-mode"]' }));
        });

        it('should contains dropdown with 2 modes', async () => {
            await selectHarness.open();
            const optionHarness = await selectHarness.getOptions();
            expect(optionHarness.length).toBe(2);
        });

        it('should be able to select multiple players mode', async () => {
            await selectHarness.open();
            await selectHarness.clickOptions({ text: GameMode.MULTI_PLAYER });
            expect(await selectHarness.getValueText()).toBe(GameMode.MULTI_PLAYER);
        });

        it('should correctly change validation based on the selected mode', async () => {
            await selectHarness.open();
            await selectHarness.clickOptions({ text: GameMode.SINGLE_PLAYER });
            expect(component.gameFormGroup.valid).toBeTruthy();

            await selectHarness.clickOptions({ text: GameMode.MULTI_PLAYER });
            expect(component.gameFormGroup.valid).toBeFalse();

            await selectHarness.clickOptions({ text: GameMode.SINGLE_PLAYER });
            expect(component.gameFormGroup.valid).toBeTruthy();
        });
    });

    describe('Form field - multiple player mode', () => {
        let selectHarness: MatSelectHarness;
        let buttonHarness: MatButtonHarness;

        beforeEach(async () => {
            buttonHarness = await loader.getHarness(
                MatButtonHarness.with({ selector: '[data-testid="button-start-game"]' }),
            );
            selectHarness = await loader.getHarness(MatSelectHarness.with({ selector: '[data-testid="select-mode"]' }));
            await selectHarness.open();
            await selectHarness.clickOptions({ text: GameMode.MULTI_PLAYER });
        });

        it('should not allow to start a game without providing players names', async () => {
            spyOn(component.emitGame, 'emit');

            await buttonHarness.click();
            expect(component.gameFormGroup.valid).toBeFalsy();

            expect(component.emitGame.emit).not.toHaveBeenCalled();
        });

        it('should be able to start a game when players names were provided', async () => {
            spyOn(component.emitGame, 'emit');
            const inputPlayerOneHarness = await loader.getHarness(
                MatInputHarness.with({ selector: '[data-testid="input-player-one"]' }),
            );
            const inputPlayerTwoHarness = await loader.getHarness(
                MatInputHarness.with({ selector: '[data-testid="input-player-two"]' }),
            );

            await inputPlayerOneHarness.setValue('Foo');
            await inputPlayerTwoHarness.setValue('Bar');

            await buttonHarness.click();
            expect(component.gameFormGroup.valid).toBeTruthy();

            expect(component.emitGame.emit).toHaveBeenCalledWith({
                mode: GameMode.MULTI_PLAYER,
                playerOne: 'Foo',
                playerTwo: 'Bar',
                playingResourceType: GamePlayingResource.RANDOM,
            });
        });
    });

    describe('Form field - single player mode', () => {
        let selectHarness: MatSelectHarness;
        let buttonHarness: MatButtonHarness;

        beforeEach(async () => {
            buttonHarness = await loader.getHarness(
                MatButtonHarness.with({ selector: '[data-testid="button-start-game"]' }),
            );
            selectHarness = await loader.getHarness(MatSelectHarness.with({ selector: '[data-testid="select-mode"]' }));
            await selectHarness.open();
            await selectHarness.clickOptions({ text: GameMode.SINGLE_PLAYER });
        });

        it('should be able to start a game in single mode', async () => {
            spyOn(component.emitGame, 'emit');

            await buttonHarness.click();
            expect(component.gameFormGroup.valid).toBeTruthy();

            expect(component.emitGame.emit).toHaveBeenCalledWith({
                mode: GameMode.SINGLE_PLAYER,
                playingResourceType: GamePlayingResource.RANDOM,
            });
        });
    });
});
