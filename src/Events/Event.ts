import {Markable, WorkflowInterface} from "../Interfaces";
import {Marking} from "../Marking";
import {Transition} from "../Transition";

export class Event {
    private name: string;

    private subject: Markable;

    private marking: Marking;

    private transition?: Transition;
    
    private workflow: WorkflowInterface<any, any, any>

    private arguments: any;

    constructor(name: string, subject: any, args: any = {}) {
        this.name = name;
        this.subject = subject;
        this.arguments = args;
    }

    public getName(): string {
        return this.name;
    }

    public getSubject(): any {
        return this.subject;
    }

    public getArguments(): any {
        return this.arguments;
    }
}