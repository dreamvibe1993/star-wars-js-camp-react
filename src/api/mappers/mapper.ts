import { Movie } from '../../models/movie';
import { Character } from '../../models/character';
import { Planet } from '../../models/planet';
import { MoviesDTO } from '../dtos/MovieDTO';
import { CharacterDTO } from '../dtos/CharacterDTO';
import { PlanetDTO } from '../dtos/PlanetDTO';

/**
 * Returns a movie entry to display.
 *
 * @param payload Data to map from DB
 * @param docID Document ID of the collection
 */
export const mapMovie = (payload: MoviesDTO, docID: string): Movie => ({
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
  img: payload.img ?? null
} as Movie);

/**
 * Returns a planet entry to display.
 *
 * @param payload Data to map from DB
 * @param docID Document ID of the collection
 */
export const mapPlanet = (payload: PlanetDTO, docID: string): Planet => ({
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
} as Planet);

/**
 * Returns a person entry to display.
 *
 * @param payload Data to map from DB
 * @param docID Document ID of the collection
 */
export const mapCharacter = (payload: CharacterDTO, docID: string): Character => ({
  birthYear: payload.fields.birth_year,
  created: payload.fields.created,
  edited: payload.fields.edited,
  eyeColor: payload.fields.eye_color,
  gender: payload.fields.gender,
  hairColor: payload.fields.hair_color,
  height: payload.fields.height,
  homeworld: payload.fields.homeworld,
  image: payload.fields.image ?? null,
  mass: payload.fields.mass,
  name: payload.fields.name,
  skinColor: payload.fields.skin_color,
  pk: payload.pk,
  model: payload.model,
  docId: docID,
} as Character);

/**
 * Returns DTO to send it back to DB.
 *
 * @param payload Movie's data to map.
 * @param indexNumber Personal key to set.
 */
export const movieDTOMapper = (payload: Movie, indexNumber: number): MoviesDTO => ({
  fields: {
    director: payload.director,
    opening_crawl: payload.openingCrawl,
    producer: payload.producer,
    release_date: payload.releaseDate,
    title: payload.title,
    created: payload.created ?? new Date().toISOString(),
    edited: new Date().toISOString(),
    episode_id: '',
    characters: payload.charactersPKs,
    planets: payload.planetsPKs,
    species: payload.speciesPKs ?? [],
    starships: payload.starshipsPKs ?? [],
    vehicles: payload.vehiclesPKs ?? [],
  },
  img: payload.img ?? null,
  pk: indexNumber + 1,
  model: '',
});
