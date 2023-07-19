import { TransitionBlocker } from './TransitionBlocker';

export default class TransitionBlockerList implements Iterable<TransitionBlocker<any>> {
    private blockers: Array<TransitionBlocker<any>>;

    constructor(blockers: Array<TransitionBlocker<any>> = []) {
        this.blockers = [];

        for (let blocker of blockers) {
            this.add(blocker);
        }
    }

    public add<T>(blocker: TransitionBlocker<T>): this {
        this.blockers.push(blocker);

        return this;
    }

    public has(code: string): boolean {
        for (let blocker of this.blockers) {
            if (code === blocker.getCode()) {
                return true;
            }
        }

        return false;
    }

    public clear(): void {
        this.blockers = [];
    }

    public isEmpty(): boolean {
        return this.blockers.length === 0;
    }

    public[Symbol.iterator]<T>(): Iterator<TransitionBlocker<T>> {
        let index = -1;
        let data = this.blockers;

        return {
            next: () => ({ value: data[++index], done: !(index in data) })
        };
    }

    public count(): number {
        return this.blockers.length;
    }
}