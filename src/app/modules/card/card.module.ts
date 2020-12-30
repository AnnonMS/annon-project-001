import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { CardsComponent } from './containers/cards/cards.component';

@NgModule({
    declarations: [CardsComponent, CardComponent],
    imports: [CommonModule, MaterialModule, SharedModule],
    exports: [CardsComponent],
})
export class CardModule {}
