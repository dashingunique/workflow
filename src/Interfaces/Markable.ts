import {Marking} from "../Marking";

export interface Markable {
    getMarkName(): string;

    getMarking(): string | string[];

    setMarking<T>(marking: string | string[], options?: T): void;
}