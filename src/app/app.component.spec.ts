import { TestBed } from '@angular/core/testing';
import { NgxsStoreModule } from '@store/store.module';
import { AppComponent } from './app.component';
import { GameModule } from './modules';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [GameModule, NgxsStoreModule],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
