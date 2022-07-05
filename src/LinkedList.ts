export class LinkedList<T> {
    private _head: LinkedListEntry<T> | undefined = undefined
    private _tail: LinkedListEntry<T> | undefined = undefined

    public shift(): T | undefined {
        const item = this._head?.item
        this._head = this._head?.next

        return item
    }

    public push(item: T) {
        const entry = new LinkedListEntry<T>(item)

        if (!this._head) {
            this._head = entry
            this._tail = entry
        } else {
            this._tail!.next = entry
            this._tail = entry
        }
    }

    public splice(item: T) {
        if (!this._head) return

        let iterator = this._head
        while (iterator.next) {
            if (iterator.next.item === item) {
                iterator.next = iterator.next.next
                return
            }

            iterator = iterator.next
        }
    }

    public forEach(callback: (item: T, entry: LinkedListEntry<T>, next: LinkedListEntry<T>) => void) {
        if (!this._head) return

        let iterator = this._head
        while (iterator.next) {
            callback(iterator.item, iterator, iterator.next)
            iterator = iterator.next
        }
    }
}

class LinkedListEntry<T> {
    constructor(private _item: T, private _next: LinkedListEntry<T> | undefined = undefined) { }

    public get item() {
        return this._item
    }

    public get next() {
        return this._next
    }

    public set next(entry: LinkedListEntry<T> | undefined) {
        this._next = entry
    }
}