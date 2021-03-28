import { UserSignInStatus } from "./reducer";
import { Movie } from "../models/movie";
import { Character } from "../models/character";
import { Planet } from "../models/planet";

/** Movies store */
export interface MoviesStore {
    /** Movies that are disp. in the sidebar */
    movies: Movie[];
    /** Rel. charaters of a movie item */
    relevantCharacters: Character[] | null;
    /** Rel. planets of a movie item */
    relevantPlanets: Planet[] | null;
    /** Movie item to display */
    movieItem: Movie | null;

    isMovieLoadingPending: boolean;

    areEntitiesLoading: boolean;

    isEntityBeingAdded: boolean;

    isEntityBeingDeleted: boolean;
}

/** Planets store */
export interface PlanetsStore {
    /** Planets that are disp. in the sidebar */
    planets: Planet[];
    /** Planet item to display */
    planetItem: Planet | null;
    /** Amount of planets items to display in the sidebar */
    itemsToDispPlanets: number;
    /** Threshold of planets to display in the sidebar */
    numberOfItemsDisplayPlanets: number;

    isPlanetLoadingPending: boolean;
}



/** People store */
export interface CharactersStore {
    /** Characters that are disp. in the sidebar */
    characters: Character[];
    /** Planet item to display */
    characterItem: Character | null;
    /** Amount of planets items to display in the sidebar */
    itemsToDispCharacters: number;
    /** Threshold of planets to display in the sidebar */
    numberOfItemsDisplayCharacters: number;

    isCharacterLoadingPending: boolean;
}

/** Components state store */
export interface ComponentsRootState {
    /** State of delet. conf. modal window */
    isDeletionConfirmationOpen: boolean;
    /** State of a current user's credentials */
    isSidebarLoading: boolean;
    /** State of the main backdrop */
    isCommonLoadingBckDropOn: boolean;
}

/** Auth state store */
export interface AuthStateRootState {
    /** State of a current user's credentials */
    isUserSignedIn: UserSignInStatus.Pending | UserSignInStatus.Authorised | UserSignInStatus.Unauthorised;
}
