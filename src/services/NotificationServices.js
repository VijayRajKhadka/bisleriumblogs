import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService";
import GlobalService from "./GlobalService";

export const getAllNotification = async () => {
    return new Promise(async (resolve, reject) => {
        const token = getLocalStorageItem('token');
        const userId = getLocalStorageItem('userId');

        if (!userId || !token) {
            console.error("User ID or token is null or undefined.");
            resolve(false);
            return;
        }

        try {
            const userIdTrimmed = userId.slice(1, -1);

            const response = await axios.get(`${GlobalService.baseUrl}notification/getAll/${userIdTrimmed}`, {
                headers: {
                    "Authorization": "Bearer " + token.replace(/"/g, '')
                }
            });
            console.log(response.data);
            resolve(response.data);
        } catch (error) {
            console.error("Error getting all notifications:", error);
            resolve(false);
        }
    });
}

export const getUnreadNotificationCount = async () => {
    return new Promise(async (resolve, reject) => {
        const token = getLocalStorageItem('token');
        const userId = getLocalStorageItem('userId');
        console.log(userId);
        if (!userId || !token) {
            console.error("User ID or token is null or undefined.");
            resolve(false);
            return;
        }

        try {
            const userIdTrimmed = userId.slice(1, -1);

            const response = await axios.get(`${GlobalService.baseUrl}notification/unreadCount/${userIdTrimmed}`, {
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

export const sendNotification = async (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = getLocalStorageItem('token');
        const userId = getLocalStorageItem('userId');

        try {
            const userIdTrimmed = userId.slice(1, -1);

            const response = await axios.post(`${GlobalService.baseUrl}notification/send`, payload, {
                headers: {
                    "Authorization": "Bearer " + token.replace(/"/g, '')
                }
            });
            console.log(response);
            resolve(response.data.status === 'Success');
        } catch (error) {
            console.error("Error sending notification:", error);
            resolve(false);
        }
    });
}
