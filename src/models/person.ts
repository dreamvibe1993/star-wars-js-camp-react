/** Person's domain model */
export interface Person {
  /** Person's birth year */
  birthYear: string;
  /** Timestamp when the entry was created */
  created: string;
  /** Timestamp when the entry was edited */
  edited: string;
  /** Person's eyes' color*/
  eyeColor: string;
  /** Person's gender */
  gender: string;
  /** Person's haircolor */
  hairColor: string;
  /** Person's height */
  height: string;
  /** Person's homeworld */
  homeworld: number;
  /** Person's image */
  image: string;
  /** Person's weight */
  mass: string;
  /** Person's name */
  name: string;
  /** Person's skin color */
  skinColor: string;
  /** Person's model prototype */
  model: string;
  /** Person's  personal key*/
  pk: number;
    /** 
   * Document identificator (here in case of displaying 
   * relevant person information or to render the entity 
   * pasting that quant. into the url) 
   */
  docId: string;
}
