import { useState, useCallback, useEffect } from 'react';
import { checkPoemExistsInDB, insertPoem, deletePoem } from '../services/database';
import { Poem } from '../types/navigation';

export const usePoemSave = (poem: Poem) => {
  const [saved, setSaved] = useState(false);

  const handleSavedPress = useCallback(async () => {
    try {
      if (!saved) {
        await insertPoem(poem.id, poem.poem, poem.author, poem.title);
        setSaved(true);
      } else {
        await deletePoem(poem.id);
        setSaved(false);
      }
    } catch (error) {
      console.error('Error handling poem save:', error);
    }
  }, [poem, saved]);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const exists = await checkPoemExistsInDB(poem.id);
        setSaved(exists);
      } catch (error) {
        console.error('Error checking poem existence:', error);
      }
    };
    checkSavedStatus();
  }, [poem.id]);

  return {
    saved,
    handleSavedPress
  };
}; 