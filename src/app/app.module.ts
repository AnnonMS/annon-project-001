import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsStoreModule } from '@store/store.module';
import { AppComponent } from './app.component';
import { GameModule } from './modules';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxsStoreModule, GameModule, BrowserAnimationsModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
