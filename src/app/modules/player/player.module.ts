import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';
import { PlayersComponent } from './containers/players/players.component';

@NgModule({
    declarations: [PlayersComponent, PlayerComponent],
    imports: [CommonModule],
    exports: [PlayersComponent],
})
export class PlayerModule {}
