
type Node = {
  value: unknown | null;
  next: Node | null;
} | null;

export class LinkedList {
  private head: Node = null;
  private tail: Node = null;

  private _length = 0;

  addToTail(item: unknown) {
    const newNode: Node = {
      value: item,
      next: null
    };

    if(this._length === 0) {
      this.head = newNode;
    } else {
      this.tail && (this.tail.next = newNode);
    }

    this.tail = newNode;
    this._length++;
  }

  removeFromHead() {
    if(this._length === 0) {
      console.warn('Attempting to remove from an empty list');
      return undefined;
    }

    const itemToReturn = this.head?.value;
    this.head && (this.head = this.head.next);

    this._length--;
    return itemToReturn;
  }

  get size() {
    return this._length;
  }
}
