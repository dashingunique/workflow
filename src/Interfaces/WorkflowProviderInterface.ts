import {Markable} from "./Markable";
import {AuditTrailOptions, TransitionOptions, WorkflowEventOptions} from "../Types";

export interface WorkflowProviderInterface<T> {
    name(): string;

    type(): string;

    metadata(): T;

    markable(): Markable;

    auditTrail(): AuditTrailOptions;

    initialPlace(): string;

    places(): Set<string>;

    transitions(): TransitionOptions[];

    events(): WorkflowEventOptions;
}