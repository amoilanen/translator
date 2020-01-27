class Storage {

  async set(key, value) {
    return new Promise(resolve => {
      chrome.storage.sync.set(
        { [key]: value },
        () => resolve(value)
      );
    });
  }

  async get(key) {
    return new Promise(resolve => {
      chrome.storage.sync.get(
        [key],
        result => resolve(result[key])
      );
    });
  }
}

export default new Storage();