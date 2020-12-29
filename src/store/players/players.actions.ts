export class PlayersSet {
    public static readonly type = '[players] Set';
    constructor(public players: { playerOneName: string; playerTwoName: string }) {}
}
export class ClearPlayers {
    public static readonly type = '[players] Clear';
}

export class PlayerUpdateScore {
    public static readonly type = '[players] Update score';
    constructor(public playerIndex: number) {}
}
