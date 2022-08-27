const Node = {
  create(value, next) {
    function toString(callback) {
      if (callback) {
        return callback(this.value);
      }

      return this.value.toString();
    }

    return {
      value,
      next,
      toString,
    };
  },
};

export default Node;
