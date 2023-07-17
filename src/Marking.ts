export class Marking {
    private places: Map<string, number> = new Map();

    constructor(representation: string[] = []) {
        representation.forEach((place) => {
            this.mark(place);
        })
    }

    mark(place: string) {
        if (!this.hasMarked(place)) {
            this.places.set(place, 1);
        }

        return this;
    }

    unmark(place: string) {
        if (this.hasMarked(place)) {
            this.places.delete(place);
        }

        return this;
    }

    allPlaces(): Map<string, number> {
        return this.places;
    }

    hasMarked(place: string): boolean {
       return  this.places.has(place);
    }
}