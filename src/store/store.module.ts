import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { DEVTOOLS_REDUX_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES_MODULES } from './store.config';
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG),
        NgxsStoragePluginModule.forRoot(),
        NgxsRouterPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
        NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
    ],
    exports: [NgxsModule],
})
export class NgxsStoreModule {}
