import {appendToList, getItem, setItem} from "./storage";


const key = 'plants-list';

export type SavedPlant = {
    name: string
}

const addPlant = (savedPlant: SavedPlant) => {
    return appendToList(key, savedPlant)
}

const loadPlants = async () => {
    return await getItem<SavedPlant[]>(key);
}

export {addPlant, loadPlants}