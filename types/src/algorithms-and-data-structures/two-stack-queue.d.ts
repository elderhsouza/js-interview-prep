export declare class Queue {
    private _enqueueStorage;
    private _dequeueStorage;
    enqueue(item: unknown): void;
    dequeue(): unknown;
    get size(): number;
}
