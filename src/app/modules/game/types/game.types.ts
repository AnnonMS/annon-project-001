/* eslint-disable @typescript-eslint/naming-convention */
export enum GamePlayingResource {
    RANDOM = 'random – person or star ship',
    PERSON = 'person',
    STARSHIP = 'star ship',
}

export enum GameMode {
    SINGLE_PLAYER = 'single player',
    MULTI_PLAYER = 'multi player',
}

export type SinglePlayerGame = {
    readonly playingResourceType: GamePlayingResource;
    readonly mode: GameMode.SINGLE_PLAYER;
};

export type MultiPlayerGame = {
    readonly playingResourceType: GamePlayingResource;
    readonly mode: GameMode.MULTI_PLAYER;
    readonly playerOne: string;
    readonly playerTwo: string;
};

export type Game = SinglePlayerGame | MultiPlayerGame;

export enum ResourceType {
    PEOPLE = 'people',
    STAR_SHIPS = 'starships',
}
