
import { SQLite } from 'react-native-sqlite-storage';
// Enable promises
// SQLite.enablePromise(true);

// Database connection
const successcb = () => console.log('Database opened successfully');
const errorcb = (err) => console.log('Error opening database: ', err);
const db = async () => {
  return SQLite.openDatabase({
    name: 'Shakespeare_Poems.db',
    location: 'default', //subdirectory - visible to iTunes and backed up by iCloud
  }, successcb, errorcb);
};

export const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS LikedPoems (id INTEGER, title TEXT,poem TEXT, poet TEXT, PRIMARY KEY (id))',
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const insertPoem = (id, poem, poet, title) => {
  return new Promise(async (resolve, reject) => {
    const database = await db();
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO LikedPoems (id, title, poem, poet) VALUES (?, ?, ?, ?)',
        [id, title, poem, poet],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deletePoem = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM LikedPoems WHERE id = ?',
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};


export const getAllLikedPoem = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM LikedPoems',
        [],
        (_, result) => {
          const likedpoems = [];
          for (let i = 0; i < result.rows.length; i++) {
            likedpoems.push(result.rows.item);
          }
          resolve(likedpoems);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const checkPoemExistsInDB = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM LikedPoems WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

