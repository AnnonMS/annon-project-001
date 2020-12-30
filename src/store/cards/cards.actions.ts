import { Card } from '@app/modules/card';

export class CardsUpdate {
    public static readonly type = '[Cards] Update';
    constructor(public cards: readonly Card[]) {}
}
export class CardReset {
    public static readonly type = '[Cards] Reset';
}

export class GetRandomResource {
    public static readonly type = '[Cards] Get random resource';
    constructor(public cardIndex: number) {}
}
