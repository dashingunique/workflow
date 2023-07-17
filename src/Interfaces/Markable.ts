import {Marking} from "../Marking";

export interface Markable {
    getMarkName(): string;

    getMarking(): string | string[];

    setMarking<T>(marking: Marking, callback: (...args: T[]) => void): void;
}