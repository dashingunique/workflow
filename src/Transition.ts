export type PlaceOption = string | Array<string> | Set<string>;

export class Transition {
    private name: string;

    private from: Set<string>;

    private tos: Set<string>;

    constructor(name: string, from: PlaceOption, tos: PlaceOption) {
        this.name = name;

        this.from = this.transformPlaces(from);

        this.tos = this.transformPlaces(tos);
    }

    getName(): string {
        return this.name;
    }

    getFrom(): Set<string> {
        return this.from;
    }

    getTos(): Set<string> {
        return this.tos;
    }

    private transformPlaces<P extends PlaceOption>(places: P): Set<string> {
        let currentPlaces: Set<string> = new Set;

        if (typeof places === 'string') {
            currentPlaces.add(places);
        } else if (places instanceof Array) {
            places.forEach((place) => {
                currentPlaces.add(place);
            })
        } else {
            currentPlaces = places;
        }

        return currentPlaces;
    }
}