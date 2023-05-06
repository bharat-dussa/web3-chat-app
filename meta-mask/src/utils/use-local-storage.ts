import { useLocalStorage as useLocalStorageBase } from 'react-use';

type LocalStorageValue<T> = [T | undefined, (value: T) => void];

function useLocalStorage<T>(key: string, initialValue?: T): LocalStorageValue<T> {
  const [storedValue, setStoredValue] = useLocalStorageBase<T>(key, initialValue);

  const setValue = (value: T): void => {
    try {
      setStoredValue(value);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
