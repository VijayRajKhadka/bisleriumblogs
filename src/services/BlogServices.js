import axios from "axios"
import GlobalService from "./GlobalService"
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService"

export const addBlog = (payload) => {


    return new Promise(async (resolve, reject) => {

        console.log(getLocalStorageItem('token').replace(/"/g, ""));
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwibmJmIjoxNzE1MjMzOTgxLCJleHAiOjE3MTUyMzU3ODEsImlhdCI6MTcxNTIzMzk4MX0.6Mwgq1g1mpP07lLLXRwY9N4MBTWyMgsSAN_MSoINKUY"
                // Use global replace (/"/g) to remove all quotes from the token
            }
        };
        console.log("🚀 ~ addBlog ~ payload:", payload);
        try {
            const response = await axios.post(
                `${GlobalService.baseUrl}blogs/create`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
                        // Use global replace (/"/g) to remove all quotes from the token
                    }
                });
            console.log("🚀 ~ returnnewPromise ~ response:", response)
            console.log("🚀 ~ returnnewPromise ~ response:", response)
            if (
                response.data.status == 'Success'
            ) {
                console.log("🚀 ~ returnnewPromise ~ response:", response)
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
            const response = await axios.get(`${GlobalService.baseUrl}blogs/getAll?page=${page}`);
            resolve(response.data)
            console.log("🚀 ~ returnnewPromise ~ response:", response)
            console.log("🚀 ~ returnnewPromise ~ response:", response)
        } catch (error) {

        }
    });
}


export const getBlogDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        console.log("🚀 ~ file: BlogServices.js ~ line 100 ~ returnnewPromise ~ id", id)
        console.log("🚀 ~ file: BlogServices.js ~ line 100 ~ returnnewPromise ~ id", getLocalStorageItem('token').replace(/"/g, ""))
        try {
            const response = await axios.get(`${GlobalService.baseUrl}blogs/get/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
                    // Use global replace (/"/g) to remove all quotes from the token
                }
            });

            console.log("🚀 ~ returnnewPromise ~ response:", response)



            resolve(response.data)
        } catch (error) {
            console.error(error);
        }
    });
}

export const commentOnBlog = (payload) => {
    console.log("🚀 ~ commentOnBlog ~ payload:", payload)
    console.log("🚀 ~ commentOnBlog ~ payload:", payload.blogId)
    console.log("🚀 ~ commentOnBlog ~ payload:", payload.data)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${GlobalService.baseUrl}blogs/${payload.blogId}/comments`, payload.data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
                }
            });
            resolve(response.data)
        } catch (error) {
            console.error(error);
        }
    });
}

export const getAllComments = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${GlobalService.baseUrl}blogs/${id}/allComments`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
                }
            });
            console.log("🚀 ~ returnnewPromise ~ response:", response)
            console.log("🚀 ~ returnnewPromise ~ response.data:", response.data)


            resolve(response.data)
        } catch (error) {
            console.error(error);
        }
    });
}



export const replyOnComment = (payload) => {
    // {
    //     commentId: 1,
    //     data: {
    //         "replyContent": "string",
    //         "userId": 0,
    //     }
    // }
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${GlobalService.baseUrl}comments/reply/${payload.commentId}`, payload.data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
                }
            });
            resolve(response.data)
        } catch (error) {
            console.error(error);
        }
    });
}


export const getCommentsWithReply = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${GlobalService.baseUrl}commentWithReplies/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
                }
            });
            resolve(response.data)
        } catch (error) {
            console.error(error);
        }
    });
}

export const deleteBLog = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(`${GlobalService.baseUrl}blogs/delete/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
                }
            });
            console.log("🚀 ~ returnnewPromise ~ response:", response)
            resolve(response)
        } catch (error) {
            console.error(error);
        }
    });
}