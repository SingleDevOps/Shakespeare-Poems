import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import {Poem} from '../types/navigation';

let dbInstance: SQLiteDatabase | null = null;

const getDb = async (): Promise<SQLiteDatabase> => {
  if (dbInstance) {
    return dbInstance;
  }
  dbInstance = await openDatabase({
    name: 'Shakespeare_Poems.db',
    location: 'default',
  });
  return dbInstance;
};

export const createTable = async (): Promise<void> => {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS LikedPoems (id INTEGER, title TEXT, poem TEXT, poet TEXT, PRIMARY KEY (id))',
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const insertPoem = async (
  id: string,
  poem: string,
  poet: string,
  title: string,
): Promise<void> => {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO LikedPoems (id, title, poem, poet) VALUES (?, ?, ?, ?)',
        [Number(id), title, poem, poet],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const deletePoem = async (id: string): Promise<void> => {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM LikedPoems WHERE id = ?',
        [Number(id)],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const getAllLikedPoem = async (): Promise<Poem[]> => {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM LikedPoems',
        [],
        (_, result) => {
          const likedpoems: Poem[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            likedpoems.push({
              id: row.id.toString(),
              title: row.title,
              poem: row.poem,
              author: row.poet,
            });
          }
          resolve(likedpoems);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const checkPoemExistsInDB = async (id: string): Promise<boolean> => {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM LikedPoems WHERE id = ?',
        [Number(id)],
        (_, result) => {
          resolve(result.rows.length > 0);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};
