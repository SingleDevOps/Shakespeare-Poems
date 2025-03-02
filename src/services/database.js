import {openDatabase} from 'react-native-sqlite-storage';

const successcb = () => console.log('Database opened successfully');
const errorcb = (err) => console.log('Error opening database: ', err);
const getDb = async () => {
  const db = await openDatabase({
    name: 'Shakespeare_Poems.db',
    location: 'default',
  }, successcb, errorcb);
  return db;
};

export const createTable = () => {
  return new Promise(async (resolve, reject) => { // add async
    try{
        const db = await getDb(); // add await
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
    } catch(error){
        reject(error);
    }
  });
};

export const insertPoem = (id, poem, poet, title) => {
  return new Promise(async (resolve, reject) => { //add async
    try {
        const db = await getDb(); //add await
        db.transaction((tx) => {
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
      } catch (error) {
        reject(error);
      }
  });
};

export const deletePoem = (id) => {
  return new Promise(async (resolve, reject) => { //add async
    try{
        const db = await getDb(); //add await
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
    } catch(error){
        reject(error);
    }
  });
};


export const getAllLikedPoem = () => {
  return new Promise(async (resolve, reject) => { // add async
    try{
        const db = await getDb(); // add await
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM LikedPoems',
            [],
            (_, result) => {
                const likedpoems = [];
                for (let i = 0; i < result.rows.length; i++) {
                likedpoems.push(result.rows.item(i));
                }
                resolve(likedpoems);
            },
            (_, error) => {
                reject(error);
                return false;
            }
            );
        });
    } catch(error){
        reject(error);
    }
  });
};

export const checkPoemExistsInDB = (id) => {
  return new Promise(async (resolve, reject) => { //add async
    try{
        const db = await getDb(); // add await
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
    } catch(error){
        reject(error);
    }
  });
};
