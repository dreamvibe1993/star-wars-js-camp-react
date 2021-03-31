/** Movie Domain Model */
export interface Movie {
  /** Movie's title */
  title: string;
  /** Movie's producer */
  producer: string;
  /** Movie's release Date-ISOstring */
  releaseDate: string;
  /** Movie's director */
  director: string;
  /** Movie's opening crawl */
  openingCrawl: string;
  /** Date-ISOstring when the entry was created */
  created: string;
  /** Date-ISOstring when the entry was edited */
  edited: string;
  /** Characters taken place in the certain movie */
  charactersPKs: number[];
  /** Particular episode's id */
  episodeId: number,
  /** Planets taken place in the certain movie */
  planetsPKs: number[],
  /** Species taken place in the certain movie */
  speciesPKs: number[],
  /** Starships taken place in the certain movie */
  starshipsPKs: number[],
  /** Vehicles taken place in the certain movie */
  vehiclesPKs: number[],
  /** Personal key */
  pk: number;
  /** Document identificator */
  docId: string;
  /** Movie's image link */
  img: string | null;
}
