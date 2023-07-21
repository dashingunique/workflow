import {WorkflowEvent} from "./WorkflowEvent";
import {Transition} from "../Transition";
import {Markable, WorkflowInterface} from "../Interfaces";
import {Marking} from "../Marking";


export class TransitionEvent<Workflow, Places, Transitions, Options> extends WorkflowEvent<Workflow, Places, Transitions, Options> {
    readonly transition: Transition;

    constructor(workflow: WorkflowInterface<Workflow, Places, Transitions>, subject: Markable, making: Marking, transition: Transition, options?: Options) {
        super(workflow, subject, making, options);

        this.transition = transition;
    }
}