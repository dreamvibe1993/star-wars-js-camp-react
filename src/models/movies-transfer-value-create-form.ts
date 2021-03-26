/** Data from forms for a created by a user, movie */
export interface MovieTransferValueCreateForm {
    /** Movie's title */
    title: string;
    /** Movie's producer */
    producer: string;
    /** Movie's release date */
    releaseDate: string;
    /** Movie's director */
    director: string;
    /** Movie's opening crawl */
    openingCrawl: string;
    /** Characters given to an entry by user */
    charactersPKs: number[];
    /** Planets given to an entry by user */
    planetsPKs: number[];
}


