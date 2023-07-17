import {Marking} from "../Marking";
import {Markable} from "./Markable";

export interface MarkingStoreInterface {
    getMarking(subject: Markable): Marking;

    setMarking<T>(subject: Markable, marking: Marking, options: T): void;
}