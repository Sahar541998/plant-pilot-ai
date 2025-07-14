// utils/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem<T>(key: string, value: T): Promise<void> {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(`❌ Failed to set item for key "${key}"`, e);
    }
}

export async function getItem<T>(key: string): Promise<T | null> {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) as T : null;
    } catch (e) {
        console.error(`❌ Failed to get item for key "${key}"`, e);
        return null;
    }
}

export async function appendToList<T>(key: string, newItem: T): Promise<void> {
    try {
        const currentList = await getItem<T[]>(key);
        const updatedList = currentList ? [...currentList, newItem] : [newItem];
        await setItem(key, updatedList);
    } catch (e) {
        console.error(`❌ Failed to append to list for key "${key}"`, e);
    }
}
