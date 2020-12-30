/* eslint-disable @typescript-eslint/naming-convention */
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MaterialModule } from '@app/material/material.module';
import { People, StarShip } from '@app/modules/game';
import { SharedModule } from '@app/shared/shared.module';
import { DARTH_VADER_MOCK, MILLENNIUM_FALCON } from '@mocks/resource.mock';
import { RoundState } from '../..';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardComponent],
            imports: [MaterialModule, SharedModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        component.card = {
            id: 'a',
            roundState: RoundState.WAITING_FOR_USER_ACTION,
            resource: null,
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event on button click', async () => {
        const buttonHarness = await loader.getHarness(
            MatButtonHarness.with({ selector: '[data-testid="shadow-circle-button"' }),
        );

        spyOn(component.pickCard, 'emit');
        await buttonHarness.click();
        expect(component.pickCard.emit).toHaveBeenCalledWith();
    });

    describe('.get title', () => {
        it('should return a space instead of empty title when resource was not provided, to remain correct height', () => {
            component.card = { id: '0', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null };
            expect(component.title).toBe('');
        });

        it('should get correct title when resource was not provided', () => {
            const mockResource: People = {
                ...DARTH_VADER_MOCK,
                name: 'Darth Vader',
            };

            component.card = { id: '0', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: mockResource };
            expect(component.title).toBe('Darth Vader');
        });
    });

    describe('.get subtitle', () => {
        it('should return a space instead of empty subtitle when resource was not provided, to remain correct height', () => {
            component.card = { id: '0', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null };
            expect(component.subtitle).toBe('');
        });

        it('should return a correct subtitle for a People type resource', () => {
            const mockResource: People = {
                ...DARTH_VADER_MOCK,
                mass: '9000',
            };

            component.card = { id: '0', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: mockResource };
            expect(component.subtitle).toBe('Mass 9000');
        });

        it('should return a correct subtitle for a StarShip type resource', () => {
            const mockResource: StarShip = {
                ...MILLENNIUM_FALCON,
                crew: '9000',
            };

            component.card = { id: '0', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: mockResource };
            expect(component.subtitle).toBe('Crew 9000');
        });
    });

    describe('.get stateMessage', () => {
        it('should return correct state message when we need user action', () => {
            component.card = { id: '0', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null };
            expect(component.stateMessage).toBe('To draw a random card, please click the play button');
        });

        it('should return correct state message when waiting for opponent action', () => {
            component.card = { id: '0', roundState: RoundState.PENDING, resource: null };
            expect(component.stateMessage).toBe('Waiting for the opponent to pick a card');
        });

        it('should return correct state message when match ended in a draw', () => {
            component.card = { id: '0', roundState: RoundState.DRAW, resource: null };
            expect(component.stateMessage).toBe('Draw');
        });

        it('should return correct state message when match ended in a lose', () => {
            component.card = { id: '0', roundState: RoundState.LOSE, resource: null };
            expect(component.stateMessage).toBe('Lose');
        });

        it('should return correct state message when match ended in a Win', () => {
            component.card = { id: '0', roundState: RoundState.WON, resource: null };
            expect(component.stateMessage).toBe('Won');
        });

        it('should return Unknown State message, when state was not provided or was set incorrectly', () => {
            // @ts-expect-error
            component.card = { id: '0', roundState: undefined, resource: null };
            expect(component.stateMessage).toBe('Unknown State');
        });
    });

    describe('get iconColor', () => {
        it('should return correct color for a winner', () => {
            component.card = { id: '0', roundState: RoundState.WON, resource: null };
            expect(component.iconColor).toBe('var(--success-color)');
        });

        it('should return correct color for a losing player', () => {
            component.card = { id: '0', roundState: RoundState.LOSE, resource: null };
            expect(component.iconColor).toBe('var(--danger-color)');
        });

        it('should return correct default material accent color for other states', () => {
            // @ts-expect-error
            component.card = { id: '0', roundState: undefined, resource: null };
            expect(component.iconColor).toBe('var(--accent-color)');
        });
    });

    describe('.get icon', () => {
        it('should return correct icon when we need user action', () => {
            component.card = { id: '0', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null };
            expect(component.icon).toBe('play_arrow');
        });

        it('should return correct icon when waiting for opponent action', () => {
            component.card = { id: '0', roundState: RoundState.PENDING, resource: null };
            expect(component.icon).toBe('hourglass_bottom');
        });

        it('should return correct icon when match ended in a draw', () => {
            component.card = { id: '0', roundState: RoundState.DRAW, resource: null };
            expect(component.icon).toBe('trip_origin');
        });

        it('should return correct icon when match ended in a win', () => {
            component.card = { id: '0', roundState: RoundState.WON, resource: null };
            expect(component.icon).toBe('done');
        });

        it('should return correct icon when match ended in a lose', () => {
            component.card = { id: '0', roundState: RoundState.LOSE, resource: null };
            expect(component.icon).toBe('clear');
        });

        it('should return no icon, when state was not provided or was set incorrectly', () => {
            // @ts-expect-error
            component.card = { id: '0', roundState: undefined, resource: null };
            expect(component.icon).toBe(undefined);
        });
    });
});
