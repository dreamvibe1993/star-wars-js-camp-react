/* eslint-disable camelcase */
/** Character DTO */
export interface CharacterDTO {
  fields: {
    /** Person's birth year */
    birth_year: string;
    /** Timestamp when the entry was created */
    created: string;
    /** Timestamp when the entry was edited */
    edited: string;
    /** Person's eyes' color */
    eye_color: string;
    /** Person's gender */
    gender: string;
    /** Person's haircolor */
    hair_color: string;
    /** Person's height */
    height: number;
    /** Person's homeworld */
    homeworld: number;
    /** Person's image */
    image: string | null;
    /** Person's weight */
    mass: number;
    /** Person's name */
    name: string;
    /** Person's skin color */
    skin_color: string;
  };
  /** Person's model prototype */
  model: string;
  /** Person's  personal key */
  pk: number;
}
