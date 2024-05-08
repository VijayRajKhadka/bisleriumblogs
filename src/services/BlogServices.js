import GlobalService from "./GlobalService"
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService"

export const addBlog = (payload) => {
    var blogs = getLocalStorageItem('blogs') || [];
    blogs.push(payload);
    setLocalStorageItem('blogs', blogs);
}

export const saveBlogs = (payload) => {
    var savedBlogs = getLocalStorageItem('savedBlogs') || [];
    savedBlogs.push(payload);
    setLocalStorageItem('savedBlogs', savedBlogs);
}

export const getMyBlogs = () => {
    return getLocalStorageItem('blogs') || [];

}

