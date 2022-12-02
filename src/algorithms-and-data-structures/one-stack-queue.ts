/*
Creating a Queue Using One Stack

We’re going to go even further and restrict ourselves even more.
Recently, Google revealed that they have asked applicants
to construct a queue using only a single stack.

This might seem impossible, but it’s doable, using some trickery.

Feel free to try it yourself.
Hints
  This won’t have nice time complexities.
  Think about how you might be able to store information without using an array or an object.

*/

export class Queue {
  private _storage: unknown[] = [];

  enqueue(...items: unknown[]) {
    this._storage.push(...items);
  }

  dequeue(): unknown {
    if(this._storage.length > 1) {
      const lastItem = this._storage.pop();
      const firstItem = this.dequeue();

      this.enqueue(lastItem);
      return firstItem;

    } else if (this._storage.length === 1) {

      return this._storage.pop();
    } else {

      console.warn('Attempting to dequeue from an empty queue');
      return null;
    }
  }
}

const queue = new Queue();
queue.enqueue(1, 2, 3, 4, 5);
queue.dequeue();
queue.enqueue(6);
queue.dequeue();