import {Markable, WorkflowInterface, WorkflowProviderInterface} from "./Interfaces";
import {AuditTrailOptions, TransitionOptions, WorkflowEventOptions} from "./Types";
import {Marking} from "./Marking";
import {Transition} from "./Transition";

export type Request = {
    order: {
        id: number;
    }
}

type Metadata = {
    request: Request
}

export class WorkflowProvider<T> implements WorkflowProviderInterface<T> {
    name(): string {
        return "order";
    }

    type(): string {
        return "method";
    }

    auditTrail(): AuditTrailOptions {
        return {
            enable: true,
        };
    }

    events(): WorkflowEventOptions {
        return undefined;
    }

    initialPlace(): string {
        return "";
    }

    markable(): Markable {
        return undefined;
    }

    metadata(): T {
        return undefined;
    }

    places(): Set<string> {
        return new Set([
            "wait",
            "paid",
            "submitted",
            "refunded",
            "canceled",
            "shipped",
            "received"
        ]);
    }

    transitions(): TransitionOptions[] {
       return [
           {
               guard: (workflow: WorkflowInterface<unknown, unknown, unknown>, marking: Marking, markable: Markable, transition: Transition, options: unknown) => {
                   return marking.hasMarked('name');
               },
               name: "to_pay",
               from: new Set(["wait", "cancelled"]),
               to: new Set(["paid"]),
           }
       ]
    }
}