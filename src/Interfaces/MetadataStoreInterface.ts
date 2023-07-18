import {Transition} from "../Transition";

type TransitionName<T extends Transition> = T extends Transition ? T['getName'] : string;

export interface MetadataStoreInterface<Workflow, Places, Transitions extends Record<string, any>> {
    getWorkflowMetadata(): Workflow;

    getPlaceMetadata<K extends keyof Places>(place: K): Places[K];

    getTransitionMetadata<T extends Transition>(transition: T): Transitions[TransitionName<T>];
}