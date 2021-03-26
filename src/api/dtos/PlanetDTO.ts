/** Camelcase is disabled because It's needed to return the data back to d_base intact */
/* eslint-disable camelcase */
/** Planet's domain model */
export interface PlanetDTO {
  fields: {
    climate: string;
    /** Timestamp when the entry was created */
    created: string;
    /** Planet's diameter */
    diameter: string;
    /** Timestamp when the entry was edited */
    edited: string;
    /** Planet's gravity */
    gravity: string;
    /** Planet's name */
    name: string;
    /** Planet's orbital period */
    orbital_period: string;
    /** Planet's population */
    population: string;
    /** Planet's name rotation period */
    rotation_period: string;
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
}
