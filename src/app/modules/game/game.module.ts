import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { CardModule } from '../card/card.module';
import { PlayerModule } from '../player/player.module';
import { ErrorComponent } from './components/error/error.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameComponent } from './containers/game/game.component';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
    declarations: [GameBoardComponent, GameComponent, ErrorComponent],
    imports: [
        CommonModule,
        GameRoutingModule,
        MaterialModule,
        CardModule,
        PlayerModule,
        SharedModule,
        HttpClientModule,
    ],
})
export class GameModule {}
