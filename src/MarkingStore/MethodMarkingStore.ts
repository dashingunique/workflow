import {Markable, MarkingStoreInterface} from "../Interfaces";
import {Marking} from "../Marking";

export class MethodMarkingStore implements MarkingStoreInterface {
    private singleState: boolean = false;

    getMarking(subject: Markable): Marking {
        let existMarking = subject.getMarking();

        if (!existMarking) {
            return new Marking();
        }

        existMarking = typeof existMarking === 'string' ? [existMarking] : existMarking;

        let currentMarking: string[] = existMarking;
        if (this.singleState && existMarking.length > 0) {
            currentMarking = [existMarking[0]];
        }

        return new Marking(currentMarking);
    }

    setMarking<T>(subject: Markable, marking: Marking, options: T): void {
        let currentMarking: string[];

        if (this.singleState) {
            const firstPlace = marking.allPlaces().entries().next()[1];

            currentMarking = [firstPlace];
        }

        subject.setMarking(currentMarking, options);
    }

}