export class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this._length = 0;
    }
    addToTail(item) {
        const newNode = {
            value: item,
            next: null
        };
        if (this._length === 0) {
            this.head = newNode;
        }
        else {
            this.tail && (this.tail.next = newNode);
        }
        this.tail = newNode;
        this._length++;
    }
    removeFromHead() {
        var _a;
        if (this._length === 0) {
            console.warn('Attempting to remove from an empty list');
            return undefined;
        }
        const itemToReturn = (_a = this.head) === null || _a === void 0 ? void 0 : _a.value;
        this.head && (this.head = this.head.next);
        this._length--;
        return itemToReturn;
    }
    get size() {
        return this._length;
    }
}
//# sourceMappingURL=linked-list.js.map