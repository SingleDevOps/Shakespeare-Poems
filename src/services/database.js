
import {SQLite} from 'react-native-sqlite-storage';
// Enable promises
SQLite.enablePromise(true);

// Database connection
export const db = async () => {
  return SQLite.openDatabase({
    name: 'Shakespeare_Poems.db',
    location: '../databases' //subdirectory - visible to iTunes and backed up by iCloud
  }, successcb, errorcb);
};

