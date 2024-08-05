import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item);
        if (parsedItem !== undefined && parsedItem !== null) {
          setStoredValue(parsedItem);
        }
      }
    } catch (error) {
      // console.error(`Error reading localStorage key “${key}”:`, error);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
};
