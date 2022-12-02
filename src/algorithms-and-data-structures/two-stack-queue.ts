/*
Create a Queue Using Two Stacks

This is a fairly common interview question.

Write a function that creates a queue using two stacks.
Besides these two stacks, you may not use any additional data structures in your implementation.
It should have the methods enqueue, dequeue, and size.
*/

export class Queue {
  private _enqueueStorage: unknown[] = [];
  private _dequeueStorage: unknown[] = [];

  enqueue(item: unknown) {
    this._enqueueStorage.push(item);
  }

  dequeue() {
    if(this._dequeueStorage.length) {
      return this._dequeueStorage.pop();
    }

    if(this._enqueueStorage.length) {
      while(this._enqueueStorage.length) {
        this._dequeueStorage.push(this._enqueueStorage.pop());
      }

      return this._dequeueStorage.pop();
    }

    console.warn('Attempting to dequeue from an empty queue');
    return undefined;
  }

  get size() {
    return this._enqueueStorage.length + this._dequeueStorage.length;
  }
}
