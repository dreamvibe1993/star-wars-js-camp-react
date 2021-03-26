/** Data from form for movie edition */
export interface MovieTransferValueEditForm {
    title: string;
    producer: string;
    releaseDate: string;
    director: string;
    openingCrawl: string;
}

/** Specific object to update only necessary fields in the db */
export interface MovieTransderValueForUpdate {
    'fields.title': string;
    'fields.opening_crawl': string;
    'fields.producer': string;
    'fields.release_date': string;
    'fields.director': string;
    'fields.created': string;
    'fields.edited': string;
}