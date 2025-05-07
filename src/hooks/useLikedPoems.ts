import { useState, useCallback } from 'react';
import { getAllLikedPoem, deletePoem } from '../services/database';
import { Poem } from '../types/navigation';

export const useLikedPoems = () => {
  const [likedPoems, setLikedPoems] = useState<Poem[]>([]);

  const loadLikedPoems = useCallback(async () => {
    try {
      const allLikedPoems = await getAllLikedPoem();
      setLikedPoems(allLikedPoems);
      return allLikedPoems;
    } catch (error) {
      console.error('Error loading liked poems:', error);
      return [];
    }
  }, []);

  const handleUnlike = useCallback(async (id: string) => {
    try {
      await deletePoem(id);
      setLikedPoems(prevPoems => prevPoems.filter(poem => poem.id !== id));
      console.log(`Poem with ID ${id} unliked successfully.`);
    } catch (error) {
      console.error(`Error unliking poem with ID ${id}:`, error);
    }
  }, []);

  return {
    likedPoems,
    loadLikedPoems,
    handleUnlike,
    setLikedPoems
  };
}; 