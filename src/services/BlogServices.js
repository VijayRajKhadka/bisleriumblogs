import axios from "axios"
import GlobalService from "./GlobalService"
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService"

export const addBlog = (payload) => {


    return new Promise(async (resolve, reject) => {

        console.log(getLocalStorageItem('token'));
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwibmJmIjoxNzE1MjMzOTgxLCJleHAiOjE3MTUyMzU3ODEsImlhdCI6MTcxNTIzMzk4MX0.6Mwgq1g1mpP07lLLXRwY9N4MBTWyMgsSAN_MSoINKUY"
                // Use global replace (/"/g) to remove all quotes from the token
            }
        };
        console.log("🚀 ~ addBlog ~ options:", options);
        console.log("🚀 ~ addBlog ~ payload:", payload);
        try {
            const response = await axios.post(
                `https://localhost:7216/api/blogs/create`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
                        // Use global replace (/"/g) to remove all quotes from the token
                    }
                });
            if (
                response.data.status == 'Success'
            ) {

                resolve(true);
            } else {
                resolve(false);
            }


            console.log(response);
        } catch (error) {
            console.error(error);
        }
    });


}

export const saveBlogs = (payload) => {
    var savedBlogs = getLocalStorageItem('savedBlogs') || [];
    savedBlogs.push(payload);
    setLocalStorageItem('savedBlogs', savedBlogs);
}

export const getAllBlogs = (page) => {
    const optins = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalStorageItem('token')}`
        }
    }

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://localhost:7216/api/blogs/getAll?page=${page}`);
            resolve(response.data)
        } catch (error) {
            console.error(error);
        }
    });
}

