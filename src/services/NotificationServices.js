import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService";
import GlobalService from "./GlobalService";

export const getAllNotification = async () => {
    return new Promise(async (resolve, reject) => {
        const token = getLocalStorageItem('token');
        const userId = getLocalStorageItem('userId').slice(1, -1); 

        if (!userId || !token) {
            console.error("User ID or token is null or undefined.");
            resolve(false);
            return;
        }

        try {

            const response = await axios.get(`${GlobalService.baseUrl}notification/getAll/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + token.replace(/"/g, '')
                }
            });
            console.log(response)
            resolve(response.data.status === 'Success');
        } catch (error) {
            console.error("Error getting all notifications:", error);
            resolve(false);
        }
    });
}

export const getUnreadNotificationCount = async () => {
    return new Promise(async (resolve, reject) => {
        const userId = getLocalStorageItem('userId').slice(1, -1); 
        const token = getLocalStorageItem('token');

        if (!userId || !token) {
            console.error("User ID or token is null or undefined.");
            resolve(false);
            return;
        }

        try {

            const response = await axios.get(`${GlobalService.baseUrl}notification/unreadCount/${userId}`, {
                headers: {
                    "Authorization": "Bearer " + token.replace(/"/g, '')
                }
            });
            console.log(response);
            resolve(response.data);

        } catch (error) {
            console.error("Error getting unread notification count:", error);
            resolve(false);
        }
    });
}
