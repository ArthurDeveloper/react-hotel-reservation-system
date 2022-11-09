import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (s: any) => void] => {
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<any>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log('🔥', error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setLocalStorageValue = (value: any) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log('🔥', error);
        }
    };

    return [storedValue, setLocalStorageValue];
};

export default useLocalStorage;
