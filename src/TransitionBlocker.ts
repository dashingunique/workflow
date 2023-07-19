import {Marking} from './Marking';

export class TransitionBlocker<T extends { [key: string]: any }> {
    public static readonly BLOCKED_BY_MARKING = '19beefc8-6b1e-4716-9d07-a39bd6d16e34';
    public static readonly BLOCKED_BY_EXPRESSION_GUARD_LISTENER = '326a1e9c-0c12-11e8-ba89-0ed5f89f718b';
    public static readonly UNKNOWN = 'e8b5bbb9-5913-4b98-bfa6-65dbd228a82a';

    private message: string;
    private code: string;
    private parameters: object;

    constructor(message: string, code: string, parameters?: T) {
        this.message = message;
        this.code = code;
        this.parameters = parameters;
    }

    public static createBlockedByMarking<T>(marking: Marking): TransitionBlocker<T> {
        return new TransitionBlocker('The marking does not enable the transition.', TransitionBlocker.BLOCKED_BY_MARKING, {
            'marking': marking,
        });
    }

    public static createBlockedByExpressionGuardListener<T>(expression: string): TransitionBlocker<T> {
        return new TransitionBlocker('The expression blocks the transition.', TransitionBlocker.BLOCKED_BY_EXPRESSION_GUARD_LISTENER, {
            'expression': expression,
        });
    }

    public static createUnknown<T>(message?: string): TransitionBlocker<T> {
        if (message) {
            return new TransitionBlocker(message, TransitionBlocker.UNKNOWN);
        }

        return new TransitionBlocker('The transition has been blocked by a guard.', TransitionBlocker.UNKNOWN);
    }

    public getMessage(): string {
        return this.message;
    }

    public getCode(): string {
        return this.code;
    }

    public getParameters(): object {
        return this.parameters;
    }
}