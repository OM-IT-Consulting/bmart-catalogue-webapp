export default {
  /**
     * Array used to track history
     */
  history: [],
  /**
     * Method that returns the last journey details
     */
  getLastHistory() {
    const lastPath = this.history[this.history.length - 2] || {};
    return Object.keys(lastPath).length ? lastPath : { path: '/', params: {} };
  },
  /**
     * Method that used to update the history array manually
     */
  updateHistory(path) {
    this.history.push(path);
  }

};
