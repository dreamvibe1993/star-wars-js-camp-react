import { UserSignInStatus } from "../store/reducer";
import { Movie } from "./movie";
import { Person } from "./person";
import { Planet } from "./planet";

/** Initial store states */
export interface DataStoreRootState {
    /** Movies that are disp. in the sidebar */
    films: Movie[];
    /** Rel. charaters of a movie item */
    relevantCharacters: Person[];
    /** Rel. planets of a movie item */
    relevantPlanets: Planet[];
    /** Characters that are disp. in the sidebar */
    people: Person[];
    /** Planets that are disp. in the sidebar */
    planets: Planet[];
    /** Movie item to display */
    movieItem: Movie | null;
    /** Planet item to display */
    planetItem: Planet | null;
    /** Person item to display */
    personItem: Person | null;
    /** Amount of people items to display in the sidebar */
    itemsToDispPeople: number;
    /** Amount of planets items to display in the sidebar */
    itemsToDispPlanets: number;
    /** Threshold of people to display in the sidebar */
    numberOfItemsDisplayPeople: number;
    /** Threshold of planets to display in the sidebar */
    numberOfItemsDisplayPlanets: number;
    /** State of the sidebar readyness */
}

export interface ComponentsRootState {
    /** State of delet. conf. modal window */
    isDeletionConfirmationOpen: boolean;
    /** State of a current user's credentials */
    isSidebarLoading: boolean;
    /** State of the main backdrop */
    isCommonLoadingBckDropOn: boolean;
}

export interface AuthStateRootState {
    /** State of a current user's credentials */
    isUserSignedIn: UserSignInStatus.Pending | UserSignInStatus.Authorised | UserSignInStatus.Unauthorised;
}
