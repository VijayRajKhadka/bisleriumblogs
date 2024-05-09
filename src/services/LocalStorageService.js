export const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = (key) => {
    const item = localStorage.getItem(key);
    return item ? item : null;
};


