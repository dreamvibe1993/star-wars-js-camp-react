/** Planet's domain model */
export interface Planet {
  climate: string;
  /** Timestamp when the entry was created */
  created: string;
  /** Planet's diameter */
  diameter: number;
  /** Timestamp when the entry was edited */
  edited: string;
  /** Standard gravity is equivalent of 9.82 m/s^2. */
  gravity: string;
  /** Planet's name */
  name: string;
  /** Planet's orbital period. Measured in standard days. */
  orbitalPeriod: number;
  /** Planet's population */
  population: number;
  /** Planet's name rotation period. Measured in standard hours */
  rotationPeriod: number;
  /** Planet's water existence  */
  surfaceWater: string;
  /** Planet's terrain type  */
  terrain: string;
  /** Planet's model prototype  */
  model: string;
  /** Planet's personal key */
  pk: number;
  /** 
   * Document identificator (here in case of displaying 
   * relevant planet information or to render the entity 
   * pasting that quant. into the url) 
   */
  docId: string;

  img: string | null;
}
