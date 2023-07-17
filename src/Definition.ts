import {Transition} from "./Transition";
import {DefinitionInterface, MetadataStoreInterface} from "./Interfaces";

export class Definition implements DefinitionInterface {
    private places: Set<string>;

    private transitions: Map<string, Transition>;

    private metadataStore?: MetadataStoreInterface;

    constructor(
        places: Set<string>,
        transactions: Map<string, Transition>,
        store?: MetadataStoreInterface
    ) {
        this.places = places;
        this.transitions = transactions;
        this.metadataStore = store;
    }

    clearAll(): this {
        this.places.clear();
        this.transitions.clear();
        this.metadataStore = undefined;

        return this;
    }

    setMetadataStore(store: MetadataStoreInterface): this {
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

    private getTransitionName<T extends string | Transition>(transition: T): string {
        return typeof transition === 'string' ? transition : transition.getName();
    }
}