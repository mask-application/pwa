import { openDB } from 'idb';

class DB {
  constructor(conf) {
    const { dbName, dbVersion, objectStoreName } = conf;
    this.dbPromise = openDB(dbName, dbVersion, {
      upgrade(updateDB) {
        const co = updateDB.createObjectStore(objectStoreName, {
          autoIncrement: true,
        });
        co.createIndex('fileName', 'fileName', { unique: true });
        co.createIndex('mapName', 'mapName', { unique: true });
        return co;
      },
    });

    this.dbName = dbName;
    this.objectStoreName = objectStoreName;

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  get(key) {
    return this.dbPromise.then((db) =>
      db
        .transaction(this.objectStoreName)
        .objectStore(this.objectStoreName)
        .index('fileName')
        .getAll(key)
    );
  }

  set(val) {
    return this.dbPromise.then((db) => {
      const tx = db.transaction(this.objectStoreName, 'readwrite');
      tx.objectStore(this.objectStoreName).put(val);
      return tx.complete;
    });
  }
}

export const db = new DB({
  dbName: 'maps',
  dbVersion: 6,
  objectStoreName: 'mapsFiles',
});
