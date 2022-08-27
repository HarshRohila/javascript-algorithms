import Node from './Node';

const List = {
  create() {
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

    function toString() {
      if (!this.head) {
        return '';
      }

      let curr = this.head;
      const arr = [];

      while (curr) {
        arr.push(curr.value);

        if (!curr.next) {
          this.tail = curr;
        }

        curr = curr.next;
      }

      return arr.join(',');
    }

    function append(value) {
      if (!this.head) {
        this.head = Node.create(value);
        this.tail = this.head;
        return;
      }

      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }

      curr.next = Node.create(value);
      this.tail = curr.next;
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

    const publicAPI = {
      head: undefined,
      tail: undefined,
      toString,
      append,
      prepend,
      insert,
      delete: deleteValue,
      deleteTail,
    };

    return publicAPI;
  },
};

export default List;
