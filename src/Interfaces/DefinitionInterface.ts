import {Transition} from "../Transition";
import {MetadataStoreInterface} from "./MetadataStoreInterface";

export interface DefinitionInterface {
    clearAll(): this;

    setMetadataStore(store: MetadataStoreInterface): this;

    addPlace(place: string): this;

    removePlace(place: string): this;

    hasPlace(place: string): boolean;

    addTransition(transition: Transition): this;

    removeTransition<T extends string | Transition>(transition: T): this;

    hasTransition<T extends string | Transition>(transition: T): boolean;
}