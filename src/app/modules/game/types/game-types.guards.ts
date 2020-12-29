import { ApiResource, People, StarShip } from '../models';
import { Game, GameMode, MultiPlayerGame, SinglePlayerGame } from './game.types';

export const isSinglePlayerGame = (game: Game): game is SinglePlayerGame => game.mode === GameMode.SINGLE_PLAYER;
export const isMultiPlayerGame = (game: Game): game is MultiPlayerGame => game.mode === GameMode.MULTI_PLAYER;

export const isStartShipResource = (resource: ApiResource): resource is StarShip => resource.hasOwnProperty('crew');
export const isPeopleResource = (resource: ApiResource): resource is People => resource.hasOwnProperty('mass');
