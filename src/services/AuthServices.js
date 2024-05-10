import axios from "axios";
import { get, set } from "firebase/database";
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService";
import { getUserDetails } from "./UserServices";
// import { baseUrl } from "../Url";

export const registerUser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await axios.post(`https://localhost:7216/api/authenticate/register`, payload, { headers: headers });
        console.log(response);
        if (response.data.status == 'Success') {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}


export const loginUser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.post(`https://localhost:7216/api/authenticate/login`, payload, { headers: headers });
            console.log("========================");
            console.log(response.data);
            setLocalStorageItem('token', response.data.message);
            console.log("========================");
            console.log(getLocalStorageItem('token'));
            if (response.data.status == 'Success') {
                getUserDetails()
                resolve(true);
            } else {
                resolve(false);
            }

        } catch {
            reject(false);
        }


    });
}


