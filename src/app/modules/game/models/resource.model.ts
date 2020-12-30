import { People } from './people.model';
import { StarShip } from './starship.model';

export type ApiResource = People | StarShip;

export interface ApiResourceResponse {
    readonly count: number;
    readonly next: string | null;
    readonly previous: string | null;
    readonly results: readonly ApiResource[];
}
