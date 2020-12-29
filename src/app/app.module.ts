import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsStoreModule } from '@store/store.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxsStoreModule, AppRoutingModule, BrowserAnimationsModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
