import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameGuard } from './modules/create-game/create-game.guard';
import { GameGuard } from './modules/game/game.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/game/game.module').then((m) => m.GameModule),
        canActivate: [GameGuard],
    },
    {
        path: 'create-game',
        loadChildren: () => import('./modules/create-game/create-game.module').then((m) => m.CreateGameModule),
        canActivate: [CreateGameGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
