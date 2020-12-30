import { Injectable } from '@angular/core';
import { Card, RoundState } from '@app/modules/card';
import { GameMode } from '@app/modules/game';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { GameState } from '@store/game/game.state';
import { PlayerUpdateScore } from '@store/players/players.actions';
import { CardReset, CardsUpdate, GetRandomResource } from './cards.actions';
import { getRandomResourceItem, updatedCards } from './cards.utils';

export type CardsStateModel = readonly Card[];

const initialState: CardsStateModel = [
    { id: '001', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
    { id: '002', roundState: RoundState.WAITING_FOR_USER_ACTION, resource: null },
];
@State<CardsStateModel>({
    name: 'cards',
    defaults: initialState,
})
@Injectable()
export class CardsState {
    constructor(private store: Store) {}

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

    // EFFECT

    @Action(GetRandomResource)
    public getRandomResource({ getState, dispatch }: StateContext<CardsStateModel>, { cardIndex }: GetRandomResource) {
        const { playingResourceType, resources, mode } = this.store.selectSnapshot(GameState.getState);

        const randomCard = getRandomResourceItem(resources, playingResourceType, getState());
        const cards = updatedCards(cardIndex, getState(), randomCard);

        dispatch(new CardsUpdate(cards));

        const winnerIndex = cards.findIndex(({ roundState }) => roundState === RoundState.WON);

        if (mode === GameMode.MULTI_PLAYER && winnerIndex !== -1) {
            dispatch(new PlayerUpdateScore(winnerIndex));
        }
    }
}
