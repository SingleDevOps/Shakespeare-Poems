import { useState, useCallback, useEffect } from 'react';
import { Poem } from '../types/navigation';

export const useSearch = (items: Poem[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Poem[]>(items);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.poem.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  }, [items, searchQuery]);

  const handleSearch = useCallback((query?: string): void => {
    setSearchQuery(query ?? '');
  }, []);

  return {
    searchQuery,
    filteredItems,
    handleSearch,
    setFilteredItems,
  };
};
