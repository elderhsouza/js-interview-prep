export declare class Queue {
    #private;
    enqueue(item: unknown): unknown;
    dequeue(): any;
    get size(): number;
}
export declare class Queue2 {
    private _storage;
    private _firstIndex;
    private _lastIndex;
    constructor();
    enqueue(item: unknown): void;
    dequeue(): unknown;
    get size(): number;
}
