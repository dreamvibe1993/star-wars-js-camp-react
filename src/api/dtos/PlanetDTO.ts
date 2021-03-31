/* eslint-disable camelcase */
/** Planet's domain model */
export interface PlanetDTO {
  fields: {
    climate: string;
    /** Timestamp when the entry was created */
    created: string;
    /** Planet's diameter */
    diameter: number;
    /** Timestamp when the entry was edited */
    edited: string;
    /** Planet's gravity */
    gravity: string;
    /** Planet's name */
    name: string;
    /** Planet's orbital period */
    orbital_period: number;
    /** Planet's population */
    population: number;
    /** Planet's name rotation period */
    rotation_period: number;
    /** Planet's water existence  */
    surface_water: string;
    /** Planet's terrain type  */
    terrain: string;
  };
  /** Planet's model prototype  */
  model: string;
  /** Planet's personal key */
  pk: number;
  /** Planet's id */
  id: string;
  /** Picture of the planet if is */
  img: string | null;
}
