/** Person's domain model */
export interface Character {
  /** Person's birth year */
  birthYear: string;
  /** Timestamp when the entry was created */
  created: string;
  /** Timestamp when the entry was edited */
  edited: string;
  /** Person's eyes' color */
  eyeColor: string;
  /** Person's gender */
  gender: string;
  /** Person's haircolor */
  hairColor: string;
  /** Person's height. Measured in centimeters */
  height: number;
  /** Person's homeworld */
  homeworld: number;
  /** Person's image */
  image: string | null;
  /** Person's weight. Measured in kilograms */
  mass: number;
  /** Person's name */
  name: string;
  /** Person's skin color */
  skinColor: string;
  /** Person's  personal key */
  pk: number;
    /** 
   * Document identificator (here in case of displaying 
   * relevant person information or to render the entity 
   * pasting that quant. into the url) 
   */
  docId: string;
}
