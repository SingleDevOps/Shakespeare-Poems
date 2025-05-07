import { useState, useCallback } from 'react';

export const useFontSize = (initialSize: number, minSize: number = 15, maxSize: number = 25) => {
  const [fontSize, setFontSize] = useState(initialSize);

  const addFontSize = useCallback(() => {
    if (fontSize <= maxSize) {
      setFontSize(prevSize => prevSize + 1);
    }
  }, [fontSize, maxSize]);

  const reduceFontSize = useCallback(() => {
    if (fontSize >= minSize) {
      setFontSize(prevSize => prevSize - 1);
    }
  }, [fontSize, minSize]);

  return {
    fontSize,
    addFontSize,
    reduceFontSize
  };
}; 