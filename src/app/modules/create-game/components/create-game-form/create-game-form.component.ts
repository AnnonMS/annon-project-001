import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game, GameMode, GamePlayingResource, isSinglePlayerGame } from '@app/modules/game';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-create-game-form',
    templateUrl: './create-game-form.component.html',
    styleUrls: ['./create-game-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGameFormComponent implements OnInit, OnDestroy {
    @Output() readonly emitGame = new EventEmitter<Game>();

    readonly playingResourceType = Object.values(GamePlayingResource);
    readonly mode = Object.values(GameMode);

    readonly gameFormGroup: FormGroup = this.fb.group({
        playingResourceType: [GamePlayingResource.RANDOM, Validators.required],
        mode: [GameMode.SINGLE_PLAYER, Validators.required],
        playerOne: '',
        playerTwo: '',
    });

    private readonly onDestroy$: Subject<void> = new Subject();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.setFormsValidators();
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    setFormsValidators(): void {
        const playerOneControl = this.gameFormGroup.get('playerOne') as AbstractControl;
        const playerTwoControl = this.gameFormGroup.get('playerTwo') as AbstractControl;
        const modeControl = this.gameFormGroup.get('mode') as AbstractControl;

        modeControl.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((mode) => {
            if (mode === GameMode.MULTI_PLAYER) {
                playerOneControl.setValidators([Validators.required]);
                playerTwoControl.setValidators([Validators.required]);
                playerOneControl.enable();
                playerTwoControl.enable();
            }

            if (mode === GameMode.SINGLE_PLAYER) {
                playerOneControl.setValidators(null);
                playerTwoControl.setValidators(null);
                playerOneControl.disable();
                playerTwoControl.disable();
            }

            playerOneControl.updateValueAndValidity();
            playerTwoControl.updateValueAndValidity();
        });
    }

    startGame(): void {
        const form = this.gameFormGroup.value as Game;
        if (this.gameFormGroup.valid) {
            const game: Game = isSinglePlayerGame(form)
                ? { mode: form.mode, playingResourceType: form.playingResourceType }
                : form;
            this.emitGame.emit(game);
        }
    }

    get isSinglePlayerMode(): boolean {
        return this.gameFormGroup.value.mode === GameMode.SINGLE_PLAYER;
    }
}
