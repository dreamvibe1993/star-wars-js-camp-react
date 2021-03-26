/** Movies DTO */
export interface MoviesDTO {
  fields: {
    /** Movie's title */
    title: string;
    /** Movie's producer */
    producer: string;
    /** Movie's release date */
    release_date: string;
    /** Movie's director */
    director: string;
    /** Movie's opening crawl */
    opening_crawl: string;
    /** Date-ISOstring when the entry was created */
    created: string;
    /** Date-ISOstring when the entry was edited */
    edited: string;
    /** Characters taken place in the certain movie */
    characters: number[];
    /** Particular episode's id */
    episode_id: number | string;
    /** Planets taken place in the certain movie */
    planets: number[];
    /** Species taken place in the certain movie */
    species: [];
    /** Starships taken place in the certain movie */
    starships: [];
    /** Vehicles taken place in the certain movie */
    vehicles: [];
  };
  /** Link to model */
  model: string;
  /** Personal key */
  pk: number;
}
