import {MetadataStoreInterface} from "../Interfaces";

export class InMemoryMetadataStore<Workflow, Places, Transitions> implements MetadataStoreInterface<Workflow, Places, Transitions> {
    private workflowMetadata: Workflow;

    private placesMetadata: Places;

    private transitionsMetadata: Transitions;

    constructor(
        workflowMetadata?: Workflow,
        placesMetadata?: Places,
        transitionsMetadata?: Transitions
    ) {
        this.workflowMetadata = workflowMetadata;
        this.placesMetadata = placesMetadata;
        this.transitionsMetadata = transitionsMetadata;
    }

    getPlaceMetadata<K extends keyof Places>(place: K): Places[K];
    getPlaceMetadata<K extends keyof Places, L extends keyof Places[K]>(place: K, key: L): Places[K][L];
    getPlaceMetadata<K extends keyof Places, L extends keyof Places[K]>(place: K, key?: L): Places[K] | Places[K][L] {
        const metadata: Places[K] = this.placesMetadata[place];

        return key ? metadata[key] : metadata;
    }

    getTransitionMetadata<K extends keyof Transitions>(transition: K): Transitions[K];
    getTransitionMetadata<K extends keyof Transitions, L extends keyof Transitions[K]>(transition: K, key: L): Transitions[K][L];
    getTransitionMetadata<K extends keyof Transitions, L extends keyof Transitions[K]>(
        transition: K, key?: L
    ): Transitions[K] | Transitions[K][L] {
        const metadata = this.transitionsMetadata[transition];

        return key ? metadata[key] : metadata;
    }

    getWorkflowMetadata(): Workflow;
    getWorkflowMetadata<K extends keyof Workflow>(key: K): Workflow[K];
    getWorkflowMetadata<K extends keyof Workflow>(key?: K): Workflow | Workflow[K] {
        return key ? this.workflowMetadata[key] : this.workflowMetadata;
    }
}