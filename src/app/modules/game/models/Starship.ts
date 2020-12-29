// As the interface is reflecting the API response, it can't follow the recommended name convention
/* eslint-disable @typescript-eslint/naming-convention */

import { ResourceURL, StrNumber } from '@app/common/types';

/**
 * A Starship resource is a single transport craft that has hyperdrive capability.
 */

export interface StarShip {
    /**
     * The name of this starship. The common name, such as "Death Star".
     */
    readonly name: string;

    /**
     * The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
     */
    readonly model: string;

    /**
     * The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"
     */
    readonly starship_class: string;

    /**
     * The manufacturer of this starship. Comma separated if more than one.
     */
    readonly manufacturer: string;

    /**
     * The cost of this starship new, in galactic credits.
     */
    readonly cost_in_credits: string;

    /**
     * The length of this starship in meters.
     */
    readonly length: StrNumber;

    /**
     * The number of personnel needed to run or pilot this starship.
     */
    readonly crew: StrNumber;

    /**
     * The number of non-essential people this starship can transport.
     */
    readonly passengers: StrNumber;

    /**
     * The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.
     */
    readonly max_atmosphering_speed: StrNumber;

    /**
     * The class of this starships hyperdrive.
     */
    readonly hyperdrive_rating: string;

    /**
     * he Maximum number of Megalights this starship can travel in a standard hour. A "Megalight"
     * is a standard unit of distance and has never been defined before within the Star Wars universe.
     * This figure is only really useful for measuring the difference in speed of starships.
     * We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
     */

    readonly MGLT: string;

    /**
     * The maximum number of kilograms that this starship can transport.
     */
    readonly cargo_capacity: string;

    /**
     * The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
     */
    readonly consumables: string;

    /**
     * An array of Film URL Resources that this starship has appeared in.
     */

    readonly films: readonly ResourceURL[];
    /**
     * An array of People URL Resources that this starship has been piloted by.
     */
    readonly pilots: readonly ResourceURL[];

    /**
     * the hypermedia URL of this resource.
     */
    readonly url: ResourceURL;

    /**
     * the ISO 8601 date format of the time that this resource was created.
     */

    readonly created: string;
    /**
     * the ISO 8601 date format of the time that this resource was edited.
     */
    readonly edited: string;
}
