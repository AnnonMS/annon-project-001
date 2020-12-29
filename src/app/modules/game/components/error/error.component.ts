import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
    @Input() error!: HttpErrorResponse;
    @Output() refresh = new EventEmitter<void>();

    onResetGame() {
        this.refresh.emit();
    }
}
