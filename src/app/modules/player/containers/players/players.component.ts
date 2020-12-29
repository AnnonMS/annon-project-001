import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { PlayersStateModel, PlayerState } from '@store/players/players.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
})
export class PlayersComponent {
    @Select(PlayerState.getState) readonly playersState$!: Observable<PlayersStateModel>;
}
