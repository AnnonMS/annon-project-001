import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { DEVTOOLS_REDUX_CONFIG, LOGGER_CONFIG, OPTIONS_CONFIG, STATES_MODULES } from './store.config';

@NgModule({
    imports: [
        CommonModule,
        NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG),
        NgxsStoragePluginModule.forRoot(),
        NgxsActionsExecutingModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
        NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
    ],
    exports: [NgxsModule],
})
export class NgxsStoreModule {}
