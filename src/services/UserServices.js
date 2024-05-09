import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService";

export const getUserDetails = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://localhost:7216/api/user/details`, {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': 'Bearer ' + getLocalStorageItem('token').replace(/"/g, ''),
                }
            })
            console.log(response.data);
            setLocalStorageItem('userName', response.data.userName);
            setLocalStorageItem('email', response.data.email);
            setLocalStorageItem('firstName', response.data.firstName);
            setLocalStorageItem('lastName', response.data.lastName);
            setLocalStorageItem('userImage', response.data.userImageName);
            setLocalStorageItem('userId', response.data.userId);

            console.log(getLocalStorageItem('userName'));
            console.log(getLocalStorageItem('email'));
            console.log(getLocalStorageItem('firstName'));
            console.log(getLocalStorageItem('lastName'));
            console.log(getLocalStorageItem('userImage'));
            console.log(getLocalStorageItem('userId'));
        } catch (error) {
            console.log(error);
        }
    });
}