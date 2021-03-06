import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MaterialModule } from '@app/material/material.module';
import { ShadowCircleComponent } from '@app/shared/shadow-circle/shadow-circle.component';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ErrorComponent, ShadowCircleComponent],
            imports: [MaterialModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit event on button click', async () => {
        component.error = 'Http failure response for https://swapiZ.dev/api/people: 0 Unknown Error';

        const buttonHarness = await loader.getHarness(
            MatButtonHarness.with({ selector: '[data-testid="shadow-circle-button"' }),
        );

        spyOn(component.refresh, 'emit');
        await buttonHarness.click();
        expect(component.refresh.emit).toHaveBeenCalledWith();
    });
});
