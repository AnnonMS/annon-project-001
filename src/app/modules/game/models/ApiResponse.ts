import { People } from './People';
import { StarShip } from './Starship';

export type ApiResource = People | StarShip;

export interface ApiResourceResponse {
    readonly count: number;
    readonly next: string | null;
    readonly previous: string | null;
    readonly results: readonly ApiResource[];
}
