import {Markable, WorkflowInterface} from "./Interfaces";
import {Marking} from "./Marking";
import {Transition} from "./Transition";
import TransitionBlockerList from "./TransitionBlockerList";
import {TransitionEvent} from "./Events";
import {WorkflowListener} from "./Listeners";

export enum WorkflowEventTypes {
    GUARD = 'guard',
    TRANSITION = 'transition',
    ENTER = 'enter',
    ENTERED = 'entered',
    LEAVE = 'leave',
    COMPLETED = 'completed',
    ANNOUNCE = 'announce',
}

export type WorkflowEvents<Workflow, Places, Transitions, Options> = {
    [WorkflowEventTypes.GUARD]: {
        workflow: WorkflowInterface<Workflow, Places, Transitions>,
        subject: Markable,
        marking: Marking,
        transition: Transition,
        transitionBlockerList: TransitionBlockerList,
        options?: Options
    },
    [WorkflowEventTypes.TRANSITION]: TransitionEvent<Workflow, Places, Transitions, Options>,
    [WorkflowEventTypes.ENTER]: {
        workflow: WorkflowInterface<Workflow, Places, Transitions>,
        subject: Markable,
        marking: Marking,
        transition: Transition,
        options?: Options
    },
    [WorkflowEventTypes.ENTERED]: {
        workflow: WorkflowInterface<Workflow, Places, Transitions>,
        subject: Markable,
        marking: Marking,
        transition: Transition,
        options?: Options
    },
    [WorkflowEventTypes.LEAVE]: {
        workflow: WorkflowInterface<Workflow, Places, Transitions>,
        subject: Markable,
        marking: Marking,
        transition: Transition,
        options?: Options
    },
    [WorkflowEventTypes.COMPLETED]: {},
    [WorkflowEventTypes.ANNOUNCE]: WorkflowEventTypes.ANNOUNCE,
}

export type AuditTrailOptions = {
    enable?: boolean;
}

export type WorkflowEventOptions = {
    enable?: boolean;
    events_to_dispatch?: WorkflowEventTypes[];
    events?: {
        [key in WorkflowEventTypes]: {
            listeners: WorkflowListener[];
        }
    }
}

export interface TransitionOptions {
    guard?: (...args) => boolean;
    name?: string;
    from?: Set<string>;
    to?: Set<string>;
}