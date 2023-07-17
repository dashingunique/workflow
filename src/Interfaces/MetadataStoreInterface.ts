import {Transition} from "../Transition";

export interface MetadataStoreInterface {
    getWorkflowMetadata(): string[];

    getPlaceMetadata(place: string): string[];

    getTransitionMetadata(transition: Transition): string[];

    getMetadata<T>(key: string, subject?: string | Transition): T | undefined;
}