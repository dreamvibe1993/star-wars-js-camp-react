/** Planet's domain model */
export interface Planet {
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
  orbitalPeriod: string;
  /** Planet's population */
  population: string;
  /** Planet's name rotation period */
  rotationPeriod: string;
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
}
