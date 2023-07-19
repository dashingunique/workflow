import {Markable} from "./Markable";
import {Marking} from "../Marking";
import {DefinitionInterface} from "./DefinitionInterface";
import {MarkingStoreInterface} from "./MarkingStoreInterface";
import {MetadataStoreInterface} from "./MetadataStoreInterface";

export interface WorkflowInterface<Workflow, Places, Transitions> {
    getName(): string;

    getMarking(subject: Markable): Marking;

    can(subject: Markable, transitionName: string): boolean;

    buildTransitionBlockerList(subject: Markable, transitionName: string): string[];

    apply<T>(subject: Markable, transitionName: string, options?: T): Marking;

    getEnabledTransitions(subject: Markable): Set<string>;

    getDefinition(): DefinitionInterface<Workflow, Places, Transitions>;

    getMarkingStore(): MarkingStoreInterface;

    getMetadataStore(): MetadataStoreInterface<Workflow, Places, Transitions>;
}