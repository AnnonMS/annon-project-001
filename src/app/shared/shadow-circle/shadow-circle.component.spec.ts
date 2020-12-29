import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatRippleModule } from '@angular/material/core';
import { ShadowCircleComponent } from './shadow-circle.component';

describe('ShadowCircleComponent', () => {
    let component: ShadowCircleComponent;
    let fixture: ComponentFixture<ShadowCircleComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShadowCircleComponent],
            imports: [MatRippleModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShadowCircleComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        component.isActive = true;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit void event on button click', async () => {
        const buttonHarness = await loader.getHarness(
            MatButtonHarness.with({ selector: '[data-testid="shadow-circle-button"' }),
        );

        spyOn(component.action, 'emit');
        await buttonHarness.click();
        expect(component.action.emit).toHaveBeenCalledWith();
    });
});
