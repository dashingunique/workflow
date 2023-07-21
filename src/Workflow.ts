import {Definition} from "./Definition";
import {Markable, MarkingStoreInterface, MetadataStoreInterface, WorkflowInterface} from "./Interfaces";
import {Marking} from "./Marking";
import {Transition} from "./Transition";
import TransitionBlockerList from "./TransitionBlockerList";
import {Emitter, EventType} from 'mitt'
import {TransitionEvent} from "./Events";
import {WorkflowEventTypes} from "./Types";

export class Workflow<Workflow, Places, Transitions> implements WorkflowInterface<Workflow, Places, Transitions> {
    private definition: Definition<Workflow, Places, Transitions>;

    private markingStore: MarkingStoreInterface;

    private name: string;

    private eventDispatcher?: Emitter<Record<EventType, unknown>>;

    private eventsToDispatch?: string[];

    constructor(
        definition: Definition<Workflow, Places, Transitions>,
        markingStore: MarkingStoreInterface,
        name: string = 'unnamed',
        eventDispatcher?: Emitter<Record<EventType, unknown>>,
        eventsToDispatch?: string[]
    ) {
        this.definition = definition;
        this.markingStore = markingStore;
        this.name = name;
        this.eventDispatcher = eventDispatcher;
        this.eventsToDispatch = eventsToDispatch;
    }

    getEnabledTransitions(subject: Markable): Set<string> {
        throw new Error("Method not implemented.");
    }
    getMetadataStore(): MetadataStoreInterface<Workflow, Places, Transitions> {
        throw new Error("Method not implemented.");
    }

    getName(): string {
        return this.name;
    }

    getMarkingStore(): MarkingStoreInterface {
        return this.markingStore;
    }

    getDefinition(): Definition<Workflow, Places, Transitions> {
        return this.definition;
    }

    getMarking(subject: Markable): Marking {
        const marking = this.markingStore.getMarking(subject);

        const markPlaces = marking.allPlaces();

        // check if the subject is already in the workflow
        if (!markPlaces || markPlaces.size === 0) {

            const initialPlaces = this.definition.getInitialPlaces();
            if (!initialPlaces || initialPlaces.size === 0) {
                throw new Error('The marking is empty and there is no initial place.');
            }

            initialPlaces.forEach((place) => {
                marking.mark(place);
            });

            this.markingStore.setMarking(subject, marking, this);
        }

        const places = this.definition.getPlaces();

        // check that the subject has a known place
        markPlaces.forEach((token, place) => {
            if (!places.has(place)) {
                throw new Error(`Place "${place}" is not valid for workflow "${this.name}".`);
            }
        });

        return marking;
    }

    can(subject: Markable, transitionName: string): boolean {
        const transition = this.definition.getTransitions().get(transitionName);

        if (!transition) {
            return false;
        }

        const subjectMarking = this.getMarking(subject);

        const blockList = this.buildTransitionBlockerListForTransition(subject, subjectMarking, transition);

        return blockList.isEmpty();
    }

    buildTransitionBlockerList(subject: Markable, transitionName: string): TransitionBlockerList {
        const transition = this.definition.getTransitions().get(transitionName);

        if (!transition) {
            return new TransitionBlockerList();
        }

        const subjectMarking = this.getMarking(subject);

        return this.buildTransitionBlockerListForTransition(subject, subjectMarking, transition);
    }


    apply<Options>(subject: Markable, transitionName: string, options?: Options): Marking {
        const marking = this.getMarking(subject);

        const transition = this.definition.getTransitions().get(transitionName);

        if (!transition) {
            throw new Error(`Transition "${transitionName}" is not enabled for workflow "${this.name}".`);
        }

        const transitionBlockerList = this.buildTransitionBlockerListForTransition(subject, marking, transition);

        if (!transitionBlockerList.isEmpty()) {
            throw new Error(`Transition "${transitionName}" is blocked for workflow "${this.name}".`);
        }

        this.leave(subject, marking, transition, options);

        const currentOptions = this.transition(subject, transition, marking, options);

        this.markingStore.setMarking(subject, marking, currentOptions);

        this.enter(subject, marking, transition, currentOptions);

        this.completed(subject, marking, transition, currentOptions);

        this.annotation(subject, marking, transition, currentOptions);

        return marking;
    }

    private buildTransitionBlockerListForTransition(subject: Markable, marking: Marking, transition: Transition): TransitionBlockerList {
        const from = transition.getFrom();

        transition.getFrom().forEach((place) => {
            if (!marking.hasMarked(place)) {
                return new TransitionBlockerList();
            }
        });

        return new TransitionBlockerList();
    }

    private leave<T>(subject: Markable, marking: Marking, transition: Transition, options?: T) {
        const places = transition.getFrom();

        places.forEach((place) => {
            marking.unmark(place);
        });
    }

    private transition<T>(subject: Markable, transition: Transition, marking: Marking, options?: T): T {
        if (!this.shouldDispatchEvent(WorkflowEventTypes.TRANSITION, options)) {
            return options;
        }

        const event = new TransitionEvent(this, subject, marking, transition, options);

        this.eventDispatcher.emit(WorkflowEventTypes.TRANSITION, event);
    }

    private enter<T>(subject: Markable, marking: Marking, transition: Transition, currentOptions: T) {
        return;
    }

    private completed<T>(subject: Markable, marking: Marking, transition: Transition, currentOptions: T) {
        return;
    }

    private annotation<T>(subject: Markable, marking: Marking, transition: Transition, currentOptions: T) {
        return;
    }

    private shouldDispatchEvent<T>(name: string, options: T): boolean {
        if (!this.eventDispatcher) {
            return false;
        }

        if (options && (options['workflow_disable_leave_event'] ?? false)) {
            return false;
        }

        return this.eventsToDispatch && !this.eventsToDispatch?.includes(name);
    }
}