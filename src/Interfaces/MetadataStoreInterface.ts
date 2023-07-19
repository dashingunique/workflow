import {Transition} from "../Transition";

export interface MetadataStoreInterface<Workflow, Places, Transitions> {
    getWorkflowMetadata(): Workflow;

    getWorkflowMetadata<K extends keyof Workflow>(key: K): Workflow[K];

    getWorkflowMetadata<K extends keyof Workflow>(key?: K): Workflow | Workflow[K];


    getPlaceMetadata<K extends keyof Places>(place: K): Places[K];

    getPlaceMetadata<K extends keyof Places, L extends keyof Places[K]>(place: K, key: L): Places[K][L];

    getPlaceMetadata<K extends keyof Places, L extends keyof Places[K]>(place: K, key?: L): Places[K] | Places[K][L];


    getTransitionMetadata<K extends keyof Transitions>(transition: K): Transitions[K];

    getTransitionMetadata<K extends keyof Transitions, L extends keyof Transitions[K]>(transition: K, key: L): Transitions[K][L];

    getTransitionMetadata<K extends keyof Transitions, L extends keyof Transitions[K]>(
        transition: K, key?: L
    ): Transitions[K] | Transitions[K][L];
}