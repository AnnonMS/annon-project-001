import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material.module';
import { CreateGameFormComponent } from './components/create-game-form/create-game-form.component';
import { CreateGameComponent } from './container/create-game/create-game.component';
import { CreateGameRoutingModule } from './create-game-routing.module';

@NgModule({
    declarations: [CreateGameComponent, CreateGameFormComponent],
    imports: [CommonModule, CreateGameRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class CreateGameModule {}
