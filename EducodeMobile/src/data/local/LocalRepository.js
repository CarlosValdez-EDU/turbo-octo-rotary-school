import { AsyncStorage as internalStorage }  from 'react-native';

export async function saveOrUpdate(key, data) {
    console.log(key, data);
    const jsonString = JSON.stringify(data);
    try {
        const savedOrUpdatedItem = await internalStorage.setItem(key, jsonString);
        console.log('Element successfully saved on AsyncStorage: ' + savedOrUpdatedItem);
    } catch (e) {
        console.error('An error has occurred with the storage '+e.message);
    }
}


export async function readFrom(key) {
    try {
        const element = await internalStorage.getItem(key);
        return (element != null) ? JSON.parse(element) : null;
    } catch (e) {
        console.error('An error has occurred with the storage '+e.message);
    }
}


export async function deleteElement(key) {
    try {
        const element = await internalStorage.removeItem(key);
        console.log('This is the deleted element: '+element);
        return true;
    } catch (e) {
        console.error('An error has occurred with the storage '+e.message);
    }
}

export async function deleteAll () {
    try {
        const element = await internalStorage.clear();
        console.log(element);
        return true;
    } catch (e) {
        console.error('An error has occurred with the storage '+e.message);
    }
}


export async function getAllKeysUsed(){
    try {
        return await internalStorage.getAllKeys((res)=> {
           return res;
        });
    } catch (e) {
        console.error('An error has occurred with the storage '+e.message);
    }
}