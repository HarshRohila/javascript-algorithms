import Node from './Node';

const List = {
  create(comparator) {
    comparator = comparator
      ? comparator
      : (a, b) => {
          if (a === b) {
            return 0;
          }
          return 1;
        };

    function deleteTail() {
      if (!this.head) {
        return undefined;
      }

      let curr = this.head;

      while (curr.next && curr.next !== this.tail) {
        curr = curr.next;
      }

      const deletedNode = this.tail;

      if (curr === deletedNode) {
        this.tail = undefined;
        this.head = undefined;
      } else {
        this.tail = curr;
      }

      curr.next = undefined;

      return deletedNode;
    }

    function deleteValue(value) {
      if (!this.head) {
        return;
      }

      let deletedNode;
      while (this.head.value === value) {
        deletedNode = this.head;

        if (this.head === this.tail) {
          this.tail = undefined;
          this.head = undefined;

          return deletedNode;
        }

        this.head = this.head.next;
      }

      let curr = this.head;
      while (curr.next) {
        if (curr.next.value === value) {
          deletedNode = curr.next;
          curr.next = curr.next.next;

          if (!curr.next) {
            this.tail = curr;
          }
          continue;
        }

        curr = curr.next;
      }

      return deletedNode;
    }

    function toString(callback) {
      if (!this.head) {
        return '';
      }

      let curr = this.head;
      const arr = [];

      while (curr) {
        arr.push(curr);

        if (!curr.next) {
          this.tail = curr;
        }

        curr = curr.next;
      }

      return arr.map((i) => i.toString(callback)).join(',');
    }

    function append(value) {
      if (!this.head) {
        this.head = Node.create(value);
        this.tail = this.head;
        return this;
      }

      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }

      curr.next = Node.create(value);
      this.tail = curr.next;

      return this;
    }

    function prepend(value) {
      const { head } = this;
      const node = Node.create(value, head);

      if (!this.head) {
        this.tail = node;
      }

      this.head = node;
    }

    function insert(value, index) {
      if (index <= 0 || !this.head) {
        this.prepend(value);
        return;
      }

      let curr = this.head;
      while (--index && curr.next) {
        curr = curr.next;
      }

      const { next } = curr;
      curr.next = Node.create(value, next);
    }

    function deleteHead() {
      if (!this.head) {
        return;
      }

      const deletedNode = this.head;

      if (this.head === this.tail) {
        this.tail = undefined;
      }

      this.head = this.head.next;

      return deletedNode;
    }

    function find({ value, callback }) {
      let curr = this.head;

      let isEqual = (v) => comparator(v, value) === 0;
      if (callback) {
        isEqual = callback;
      }

      while (curr) {
        if (isEqual(curr.value)) {
          return curr;
        }

        curr = curr.next;
      }
    }

    function fromArray(arr) {
      this.head = undefined;
      this.tail = undefined;
      arr.forEach((el) => {
        this.append(el);
      });
    }

    function toArray() {
      let curr = this.head;

      const arr = [];
      while (curr) {
        arr.push(curr);
        curr = curr.next;
      }

      return arr;
    }

    function reverse() {
      if (!this.head || !this.head.next) {
        return;
      }

      var prev = this.head;
      var curr = this.head.next;

      while (curr) {
        var t = curr.next;
        curr.next = prev;

        prev = curr;
        curr = t;
      }

      this.tail = this.head;
      this.tail.next = undefined;
      this.head = prev;
    }

    const publicAPI = {
      head: undefined,
      tail: undefined,
      toString,
      append,
      prepend,
      insert,
      delete: deleteValue,
      deleteTail,
      deleteHead,
      find,
      fromArray,
      toArray,
      reverse,
    };

    return publicAPI;
  },
};

export default List;
