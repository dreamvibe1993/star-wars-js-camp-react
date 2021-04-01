import { StateType } from 'typesafe-actions';
import store from './store'

export type RootState = StateType<typeof store.getState>

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
    /** Movie loading status */
    isMovieLoadingPending: boolean;
    /** Movies loading status */
    areEntitiesLoading: boolean;
    /** Movies adding status */
    isEntityBeingAdded: boolean;
    /** Movies deletion status */
    isEntityBeingDeleted: boolean;
    /** Link to redirect */
    redirectLink: string | null;
    /** Status of loading completed */
    areMovieEntitiesLoaded: boolean;
    /** Status of deleteion modal open */
    isDeletionConfirmationOpen: boolean;
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
    /** Status if planet is being loaded */
    isPlanetLoadingPending: boolean;
    /** Status if planet is finished loading */
    arePlanetEntitiesLoaded: boolean;
    /** Status to set a spinner on sidebar */
    isSidebarLoading: boolean;
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
    /** Status if planet is being loaded */
    isCharacterLoadingPending: boolean;
    /** Status if planet is finished loading */
    areCharacterEntitiesLoaded: boolean;
    /** Status to set a spinner on sidebar */
    isSidebarLoading: boolean;
}

/** User email and password. */
interface UserCredentials {
    email: string;
    password: string;
}

/** Auth state store */
export interface AuthStateRootState {
    /** State of a current user's credentials */
    isUserSignedIn: UserSignInStatus.Pending | UserSignInStatus.Authorised | UserSignInStatus.Unauthorised;
    /** If error is password set a message */
    passwordErrorCodeMsg: string | null;
    /** If error is email set a message */
    emailErrorCodeMsg: string | null;
    /** User's email */
    userEmail: string | null;
}

export interface ComponentsRootState {
    /** Is common backdrop is in effect */
    isCommonLoadingBckDropOn: boolean;
    /** Status of dark or light themes */
    mode: boolean;
}