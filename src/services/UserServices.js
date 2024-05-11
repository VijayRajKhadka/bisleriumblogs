import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService";

export const getUserDetails = async () => {
    try {
        const response = await axios.get(`https://localhost:7216/api/user/details`, {
            headers: {
                "Content-Type": "application/json",
                'authorization': 'Bearer ' + getLocalStorageItem('token').replace(/"/g, ''),
            }
        });

        const userData = response.data;

        setLocalStorageItem('userName', userData.userName);
        setLocalStorageItem('email', userData.email);
        setLocalStorageItem('firstName', userData.firstName);
        setLocalStorageItem('lastName', userData.lastName);
        setLocalStorageItem('userImage', userData.userImageName);
        setLocalStorageItem('userId', userData.userId);

        console.log(getLocalStorageItem('userName'));
        console.log(getLocalStorageItem('email'));
        console.log(getLocalStorageItem('firstName'));
        console.log(getLocalStorageItem('lastName'));
        console.log(getLocalStorageItem('userImage'));
        console.log(getLocalStorageItem('userId'));

        return userData;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
};



export const updateUserDetails = async (payload) => {
    console.log("🚀 ~ updateUserDetails ~ payload:", payload)
    try {
        const response = await axios.put(`https://localhost:7216/api/user/edit`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + getLocalStorageItem('token').replace(/"/g, ''),
            }
        });
        console.log(response);
        return response

    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
}
