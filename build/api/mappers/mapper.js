/**
 * Returns a movie entry to display.
 *
 * @param payload Data to map from DB
 * @param docID Document ID of the collection
 */
export var mapMovie = function (payload, docID) {
    var _a;
    return ({
        title: payload.fields.title,
        producer: payload.fields.producer,
        releaseDate: payload.fields.release_date,
        director: payload.fields.director,
        openingCrawl: payload.fields.opening_crawl,
        created: payload.fields.created,
        edited: payload.fields.edited,
        charactersPKs: payload.fields.characters,
        episodeId: payload.fields.episode_id,
        planetsPKs: payload.fields.planets,
        speciesPKs: payload.fields.species,
        starshipsPKs: payload.fields.starships,
        vehiclesPKs: payload.fields.vehicles,
        pk: payload.pk,
        model: payload.model,
        docId: docID,
        img: (_a = payload.img) !== null && _a !== void 0 ? _a : null
    });
};
/**
 * Returns a planet entry to display.
 *
 * @param payload Data to map from DB
 * @param docID Document ID of the collection
 */
export var mapPlanet = function (payload, docID) { return ({
    climate: payload.fields.climate,
    created: payload.fields.created,
    diameter: payload.fields.diameter,
    edited: payload.fields.edited,
    gravity: payload.fields.gravity,
    name: payload.fields.name,
    orbitalPeriod: payload.fields.orbital_period,
    population: payload.fields.population,
    rotationPeriod: payload.fields.rotation_period,
    surfaceWater: payload.fields.surface_water,
    terrain: payload.fields.terrain,
    pk: payload.pk,
    model: payload.model,
    docId: docID,
    img: payload.img
}); };
/**
 * Returns a person entry to display.
 *
 * @param payload Data to map from DB
 * @param docID Document ID of the collection
 */
export var mapCharacter = function (payload, docID) {
    var _a;
    return ({
        birthYear: payload.fields.birth_year,
        created: payload.fields.created,
        edited: payload.fields.edited,
        eyeColor: payload.fields.eye_color,
        gender: payload.fields.gender,
        hairColor: payload.fields.hair_color,
        height: payload.fields.height,
        homeworld: payload.fields.homeworld,
        image: (_a = payload.fields.image) !== null && _a !== void 0 ? _a : null,
        mass: payload.fields.mass,
        name: payload.fields.name,
        skinColor: payload.fields.skin_color,
        pk: payload.pk,
        model: payload.model,
        docId: docID,
    });
};
/**
 * Returns DTO to send it back to DB.
 *
 * @param payload Movie's data to map.
 * @param indexNumber Personal key to set.
 */
export var movieDTOMapper = function (payload, indexNumber) {
    var _a, _b, _c, _d, _e;
    return ({
        fields: {
            director: payload.director,
            opening_crawl: payload.openingCrawl,
            producer: payload.producer,
            release_date: payload.releaseDate,
            title: payload.title,
            created: (_a = payload.created) !== null && _a !== void 0 ? _a : new Date().toISOString(),
            edited: new Date().toISOString(),
            episode_id: '',
            characters: payload.charactersPKs,
            planets: payload.planetsPKs,
            species: (_b = payload.speciesPKs) !== null && _b !== void 0 ? _b : [],
            starships: (_c = payload.starshipsPKs) !== null && _c !== void 0 ? _c : [],
            vehicles: (_d = payload.vehiclesPKs) !== null && _d !== void 0 ? _d : [],
        },
        img: (_e = payload.img) !== null && _e !== void 0 ? _e : null,
        pk: indexNumber + 1,
        model: '',
    });
};
