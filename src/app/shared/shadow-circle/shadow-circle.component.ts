import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-shadow-circle',
    templateUrl: './shadow-circle.component.html',
    styleUrls: ['./shadow-circle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowCircleComponent {
    @Input() isActive!: boolean;
    @Input() isSmall = false;
    @Input() buttonTemplate!: TemplateRef<any> | null;

    @Output() readonly action = new EventEmitter<void>();

    onButtonPress() {
        this.action.emit();
    }
}
