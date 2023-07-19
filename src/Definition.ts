import {Transition} from "./Transition";
import {DefinitionInterface, MetadataStoreInterface} from "./Interfaces";

export class Definition<Workflow, Places, Transitions> implements DefinitionInterface<Workflow, Places, Transitions> {
    private places: Set<string>;

    private transitions: Map<string, Transition>;

    private metadataStore?: MetadataStoreInterface<Workflow, Places, Transitions>;

    private initialPlace: Set<string> = new Set();

    constructor(
        places: Set<string>,
        transactions: Map<string, Transition>,
        initialPlace?: string | string[],
        store?: MetadataStoreInterface<Workflow, Places, Transitions>
    ) {
        this.places = places;
        this.transitions = transactions;
        this.metadataStore = store;
        this.initialPlaceIsSet(initialPlace);
    }

    getMetadataStore(): MetadataStoreInterface<Workflow, Places, Transitions> {
        return this.metadataStore;
    }
    getPlaces(): Set<string> {
        return this.places;
    }
    getTransitions(): Map<string, Transition> {
        return this.transitions;
    }

    clearAll(): this {
        this.places.clear();
        this.transitions.clear();
        this.metadataStore = undefined;

        return this;
    }

    setMetadataStore(store: MetadataStoreInterface<Workflow, Places, Transitions>): this {
        this.metadataStore = store;

        return this;
    }

    addPlace(place: string): this {
        if (!this.hasPlace(place)) {
            this.places.add(place);
        }

        return this;
    }

    removePlace(place: string): this {
        if (this.hasPlace(place)) {
            this.places.delete(place);
        }

        return this;
    }

    hasPlace(place: string): boolean {
        return this.places.has(place);
    }

    addTransition(transition: Transition): this {
        if (!this.hasTransition(transition)) {
            this.transitions.set(transition.getName(), transition);
        }

        return this;
    }

    removeTransition<T extends string | Transition>(transition: T): this {
        const name = this.getTransitionName(transition);

        if (this.hasTransition(name)) {
            this.transitions.delete(name);
        }

        return this;
    }

    hasTransition<T extends string | Transition>(transition: T): boolean {
        const name = this.getTransitionName(transition);

        return this.transitions.has(name);
    }

    getInitialPlaces(): Set<string> {
        return this.initialPlace;
    }

    private getTransitionName<T extends string | Transition>(transition: T): string {
        return typeof transition === 'string' ? transition : transition.getName();
    }

    private initialPlaceIsSet(places?: string | string[]): void {
        if (!places) {
            return;
        }

        const currentPlaces = typeof places === 'string' ? [places] : places;

        currentPlaces?.forEach((place) => {
           this.initialPlace.add(place);
        });
    }
}