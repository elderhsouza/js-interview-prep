import { LinkedList } from './linked-list';
export class Queue extends LinkedList {
    constructor() {
        super();
        this.enqueue = this.addToTail;
        this.dequeue = this.removeFromHead;
    }
}
//# sourceMappingURL=linked-list-queue.js.map