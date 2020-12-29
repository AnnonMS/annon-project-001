import { Injectable } from '@angular/core';
import { Card, PlayerInternalState } from '@app/modules/card';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CardReset, CardsUpdate } from './cards.actions';

export type CardsStateModel = readonly Card[];

const initialState: CardsStateModel = [
    { id: '001', state: PlayerInternalState.WAITING_FOR_USER_ACTION, resource: null },
    { id: '002', state: PlayerInternalState.WAITING_FOR_USER_ACTION, resource: null },
];
@State<CardsStateModel>({
    name: 'cards',
    defaults: initialState,
})
@Injectable()
export class CardsState {
    @Selector()
    public static getState(state: CardsStateModel): CardsStateModel {
        return state;
    }

    @Action(CardsUpdate)
    public cardUpdate({ setState }: StateContext<CardsStateModel>, { cards }: CardsUpdate) {
        setState(cards);
    }

    @Action(CardReset)
    public cardReset({ setState }: StateContext<CardsStateModel>) {
        setState(initialState);
    }
}
