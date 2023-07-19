import {Definition} from "./Definition";
import {Markable, MarkingStoreInterface, MetadataStoreInterface, WorkflowInterface} from "./Interfaces";
import {Marking} from "./Marking";
import {Transition} from "./Transition";
import TransitionBlockerList from "./TransitionBlockerList";
import mitt, {Emitter} from 'mitt'

export class Workflow<Workflow, Places, Transitions> implements WorkflowInterface<Workflow, Places, Transitions> {
    private definition: Definition<Workflow, Places, Transitions>;

    private markingStore: MarkingStoreInterface;

    private name: string;

    private eventDispatcher?: Emitter<{}>;

    constructor(
        definition: Definition<Workflow, Places, Transitions>,
        markingStore: MarkingStoreInterface,
        name: string = 'unnamed',
        eventDispatcher?: Emitter<{}>
    ) {
        this.definition = definition;
        this.markingStore = markingStore;
        this.name = name;
        this.eventDispatcher = eventDispatcher || mitt();
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
}