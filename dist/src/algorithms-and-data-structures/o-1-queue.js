/*
Creating a Queue with O(1) Operations

For this problem, familiarity with queues, hash tables, and linked lists would help.
Instructions

Create a queue data structure with O(1) insertion, deletion, and size calculation.
Queue

A queue is a data structure that keeps track of data in the order in which it was entered.
Items are inserted into the back of the queue and removed from the front of the queue.

A real-world analogy would be a line at a grocery store.
Everyone enters the line at the back.
The first person who enters will be the first person served.

Common operations available to perform on a queue are:

    enqueue, or adding someone to the back of the queue
    dequeue, or removing someone from the front of the queue
    size, or checking the number of items in the queue

A common interview question is to create a queue that can perform
each of these operations in constant-time.
There are two common ways to do this.

Feel free to try it yourself first.
There are many correct ways to complete this, so we won’t have prepared tests for it.
*/
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Queue_queue;
export class Queue {
    constructor() {
        _Queue_queue.set(this, new Map());
    }
    enqueue(item) {
        __classPrivateFieldGet(this, _Queue_queue, "f").set(item, item);
        return item;
    }
    dequeue() {
        if (this.size === 0) {
            console.warn('dequeuing from an empty queue');
            return undefined;
        }
        const dequeued = __classPrivateFieldGet(this, _Queue_queue, "f").values().next().value;
        __classPrivateFieldGet(this, _Queue_queue, "f").delete(dequeued);
        return dequeued;
    }
    get size() {
        return __classPrivateFieldGet(this, _Queue_queue, "f").size;
    }
}
_Queue_queue = new WeakMap();
//---
export class Queue2 {
    constructor() {
        this._storage = {};
        this._firstIndex = 0;
        this._lastIndex = 0;
    }
    enqueue(item) {
        this._storage[this._lastIndex] = item;
        this._lastIndex++;
    }
    dequeue() {
        if (this.size === 0) {
            console.warn('Attempting to dequeue from an empty queue');
            return undefined;
        }
        const itemToReturn = this._storage[this._firstIndex];
        delete this._storage[this._firstIndex];
        this._firstIndex++;
        return itemToReturn;
    }
    get size() {
        return this._lastIndex - this._firstIndex;
    }
}
//# sourceMappingURL=o-1-queue.js.map