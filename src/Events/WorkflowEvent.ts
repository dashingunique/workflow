import {Markable, WorkflowInterface} from "../Interfaces";
import {Marking} from "../Marking";
import {Transition} from "../Transition";

export type TransitionName<T extends Transition, Transitions> = T['getName'] extends keyof Transitions[keyof Transitions] ? T['getName'] : never;

export class WorkflowEvent<Workflow, Places, Transitions, Options> {
    readonly workflow: WorkflowInterface<Workflow, Places, Transitions>

    readonly subject: Markable;

    readonly marking: Marking;

    readonly options?: Options;

    constructor(workflow: WorkflowInterface<Workflow, Places, Transitions>, subject: Markable, making: Marking, options?: Options) {
        this.workflow = workflow;
        this.subject = subject;
        this.marking = making;
        this.options = options;
    }

    getMetadata<T extends keyof Workflow>(key: T): Workflow[T];
    getMetadata<K extends keyof Places, T extends keyof Places[K]>(key: T, subject: K): Places[K][T];
    getMetadata<K extends keyof Transitions, T extends Transition>(key: T, subject: K): Transitions[K][TransitionName<T, Transitions>];
    getMetadata<
        WK extends keyof Workflow,
        PK extends keyof Places,
        TK extends keyof Transitions,
        PVK extends keyof Places[PK],
        TVK extends Transition,
        T extends (WK | PVK | TVK),
        S extends (PK | TK)
    >(
        key: T,
        subject?: S
    ):  Workflow[WK] | Places[PK][PVK] | Transitions[TK][TransitionName<TVK, Transitions>] {
        const metadataStore = this.workflow.getMetadataStore();

        if (!subject) {
            return metadataStore.getWorkflowMetadata(key as unknown as WK);
        } else {
            if (typeof subject === 'string') {
                return metadataStore.getPlaceMetadata(subject as unknown as PK, key as unknown as PVK);
            } else {
                return metadataStore.getTransitionMetadata((subject as unknown as Transition).getName() as TK, key as unknown as TransitionName<TVK, Transitions>)
            }
        }
    }
}
