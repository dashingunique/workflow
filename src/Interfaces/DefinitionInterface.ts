import {Transition} from "../Transition";
import {MetadataStoreInterface} from "./MetadataStoreInterface";

export interface DefinitionInterface<Workflow, Places, Transitions> {
    clearAll(): this;

    setMetadataStore(store: MetadataStoreInterface<Workflow, Places, Transitions>): this;

    getMetadataStore(): MetadataStoreInterface<Workflow, Places, Transitions>;

    getPlaces(): Set<string>;

    addPlace(place: string): this;

    removePlace(place: string): this;

    hasPlace(place: string): boolean;

    getTransitions(): Map<string, Transition>;

    addTransition(transition: Transition): this;

    removeTransition<T extends string | Transition>(transition: T): this;

    hasTransition<T extends string | Transition>(transition: T): boolean;

    getInitialPlaces(): Set<string>;
}