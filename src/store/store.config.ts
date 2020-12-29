import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin/src/symbols';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { CardsState, CardsStateModel } from './cards/cards.state';
import { GameState, GameStateModel } from './game/game.state';
import { PlayersStateModel, PlayerState } from './players/players.state';

export type RootState = {
    readonly cards: CardsStateModel;
    readonly game: GameStateModel;
    readonly players: PlayersStateModel;
};

export const STATES_MODULES = [GameState, PlayerState, CardsState];

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
    /**
     * Run in development mode. This will add additional debugging features:
     * - Object.freeze on the state and actions to guarantee immutability
     * todo: you need set production mode
     * import { environment } from '@env';
     * developmentMode: !environment.production
     */
    developmentMode: true,
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
    /**
     * Whether the dev tools is enabled or note. Useful for setting during production.
     * todo: you need set production mode
     * import { environment } from '@env';
     * disabled: environment.production
     */
    disabled: false,
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
    /**
     * Disable the logger. Useful for prod mode..
     * todo: you need set production mode
     * import { environment } from '@env';
     * disabled: environment.production
     */
    disabled: true,
};
