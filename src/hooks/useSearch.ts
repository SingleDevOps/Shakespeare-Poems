import { useState, useCallback } from 'react';
import { Poem } from '../types/navigation';

export const useSearch = (items: Poem[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Poem[]>(items);

  const handleSearch = useCallback((query: string): void => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.author.toLowerCase().includes(query.toLowerCase()) ||
          item.poem.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [items]);

  return {
    searchQuery,
    filteredItems,
    handleSearch,
    setFilteredItems,
  };
};
