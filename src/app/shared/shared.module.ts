import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material/material.module';
import { ShadowCircleComponent } from './shadow-circle/shadow-circle.component';

@NgModule({
    declarations: [ShadowCircleComponent],
    imports: [CommonModule, MaterialModule],
    exports: [ShadowCircleComponent],
})
export class SharedModule {}
