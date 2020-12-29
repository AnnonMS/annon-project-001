import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { CardModule } from '../card/card.module';
import { PlayerModule } from '../player/player.module';
import { CreateGameFormComponent } from './components/create-game-form/create-game-form.component';
import { ErrorComponent } from './components/error/error.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameComponent } from './containers/game/game.component';

@NgModule({
    declarations: [GameBoardComponent, CreateGameFormComponent, GameComponent, ErrorComponent],
    imports: [CommonModule, MaterialModule, CardModule, ReactiveFormsModule, PlayerModule, SharedModule],
    exports: [GameComponent],
})
export class GameModule {}
