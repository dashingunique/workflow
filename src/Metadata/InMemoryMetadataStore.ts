import {MetadataStoreInterface} from "../Interfaces";
import {Transition} from "../Transition";

export class InMemoryMetadataStore<Workflow, Places, Transitions> implements MetadataStoreInterface<Workflow, Places, Transitions> {
    private workflowMetadata?: Workflow;

    private placesMetadata?: Places;

    private transitionsMetadata?: Transitions;

    constructor(
        workflowMetadata?: Workflow,
        placesMetadata?: Places,
        transitionsMetadata?: Transitions
    ) {
        this.workflowMetadata = workflowMetadata;
        this.placesMetadata = placesMetadata;
        this.transitionsMetadata = transitionsMetadata;
    }

    getMetadata<T extends string | Transition, R>(key: string, subject?: T): R {
        if (!subject) {
            return this.getWorkflowMetadata()[key];
        }

        const metadataBag = typeof subject === 'string' ? this.getPlaceMetadata(subject) : this.getTransitionMetadata(subject);

        return metadataBag[key];
    }

    getPlaceMetadata<R>(place: string): R {
        return this.placesMetadata?.[place];
    }

    getTransitionMetadata<R>(transition: Transition): R {
        return this.transitionsMetadata?.[transition.getName()];
    }

    getWorkflowMetadata() {
        return this.workflowMetadata;
    }
}