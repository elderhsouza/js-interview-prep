import { LinkedList } from './linked-list';

export class Queue extends LinkedList {
  enqueue;
  dequeue;

  constructor() {
    super();
    this.enqueue = this.addToTail;
    this.dequeue = this.removeFromHead;
  }
}
