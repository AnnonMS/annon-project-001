import { ResourceURL, StrNumber } from '@app/common/types';

// As the interface is reflecting the API response, it can't follow the recommended name convention on this place.
/* eslint-disable @typescript-eslint/naming-convention */

/**
 * A People resource is an individual person or character within the Star Wars universe.
 */

export interface People {
    /**
     * The name of this person.
     */
    readonly name: string;

    /**
     * The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin.
     * The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.
     */
    readonly birth_year: string;

    /**
     *  The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
     */
    readonly eye_color: string;

    /**
     * An array of film resource URLs that this person has been in.
     */
    readonly films: readonly ResourceURL[];

    /**
     * The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
     */
    readonly gender: string;

    /**
     * The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
     */
    readonly hair_color: string;

    /**
     * The height of the person in centimeters.
     */
    readonly height: StrNumber;

    /**
     * The URL of a planet resource, a planet that this person was born on or inhabits.
     */
    readonly homeworld: ResourceURL;

    /**
     * The mass of the person in kilograms.
     */
    readonly mass: StrNumber;

    /**
     * The skin color of this person.
     */
    readonly skin_color: string;

    /**
     * the ISO 8601 date format of the time that this resource was created.
     */
    readonly created: string;

    /**
     * the ISO 8601 date format of the time that this resource was edited.
     */
    readonly edited: string;

    /**
     * An array of species resource URLs that this person belongs to.
     */
    readonly species: readonly ResourceURL[];

    /**
     * An array of starship resource URLs that this person has piloted.
     */
    readonly starships: readonly ResourceURL[];

    /**
     *  the hypermedia URL of this resource.
     */
    readonly url: ResourceURL;

    /**
     *  An array of vehicle resource URLs that this person has piloted.
     */
    readonly vehicles: readonly ResourceURL[];
}
