import { Movie } from '../../models/movie';
import { MovieTransderValueForUpdate, MovieTransferValueEditForm } from '../../models/movie-transfer-value-edit-form';
import { MovieTransferValueCreateForm } from '../../models/movies-transfer-value-create-form';
import { Person } from '../../models/person';
import { Planet } from '../../models/planet';
import { MoviesDTO } from '../dtos/MovieDTO';
import { PersonDTO } from '../dtos/PersonDTO';
import { PlanetDTO } from '../dtos/PlanetDTO';

/**
 * Returns a movie entry to display.
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
} as Movie);

/**
 * When editing maps and object with specific fields to update to.
 * @param movie Movie entry which is being edited.
 * @param formValues Values from a form.
 */
export const mapMovieDTOForEdit = (movie: Movie, formValues: MovieTransferValueEditForm): MovieTransderValueForUpdate => ({
  'fields.title': formValues.title,
  'fields.opening_crawl': formValues.openingCrawl,
  'fields.producer': formValues.producer,
  'fields.release_date': formValues.releaseDate,
  'fields.director': formValues.director,
  'fields.created': movie.created ?? new Date().toISOString(),
  'fields.edited': new Date().toISOString(),
})

/**
 * Returns a planet entry to display.
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
} as Planet);

/**
 * Returns a person entry to display.
 * @param payload Data to map from DB
 * @param docID Document ID of the collection
 */
export const mapPerson = (payload: PersonDTO, docID: string): Person => ({
  birthYear: payload.fields.birth_year,
  created: payload.fields.created,
  edited: payload.fields.edited,
  eyeColor: payload.fields.eye_color,
  gender: payload.fields.gender,
  hairColor: payload.fields.hair_color,
  height: payload.fields.height,
  homeworld: payload.fields.homeworld,
  image: payload.fields.image,
  mass: payload.fields.mass,
  name: payload.fields.name,
  skinColor: payload.fields.skin_color,
  pk: payload.pk,
  model: payload.model,
  docId: docID,
} as Person);

/**
 * Returns DTO to send it back to DB.
 * ONLY FOR CREATED BY USER ENTRIES.
 * @param payload Movie's data to map.
 * @param indexNumber Personal key to set.
 */
export const movieDTOMapper = (payload: MovieTransferValueCreateForm, indexNumber: number): MoviesDTO => ({
  fields: {
    director: payload.director,
    opening_crawl: payload.openingCrawl,
    producer: payload.producer,
    release_date: payload.releaseDate,
    title: payload.title,
    created: new Date().toISOString(),
    edited: new Date().toISOString(),
    episode_id: '',
    characters: payload.charactersPKs,
    planets: payload.planetsPKs,
    species: [],
    starships: [],
    vehicles: [],
  },
  pk: indexNumber + 1,
  model: '',
});
