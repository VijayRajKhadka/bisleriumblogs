import axios from "axios";
import { get, set } from "firebase/database";
import { getLocalStorageItem, setLocalStorageItem } from "./LocalStorageService";
import { getUserDetails } from "./UserServices";
import Cookies from 'js-cookie';
// import { baseUrl } from "../Url";

export const loginAdmin = async (payload) => {
    return new Promise(async (resolve, reject) => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.post(`https://localhost:7216/api/authenticate/admin/login`, payload, { headers: headers });
            console.log("========================");
            console.log(response.data);
            Cookies.set('adminToken', response.data.message); // Use Cookies.set() to set the cookie
            console.log("========================");
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
                setLocalStorageItem('password', payload.password);
                console.log(getLocalStorageItem('password'));
                resolve(true);
            } else {
                resolve(false);
            }

        } catch {
            reject(false);
        }


    });
}








export const deleteUser = async () => {
    return new Promise(async (resolve, reject) => {
        const headers = {
            "Authorization": "Bearer " + getLocalStorageItem('token').replace(/"/g, "")
        };

        try {
            const response = await axios.delete(`https://localhost:7216/api/user/delete`,{ headers: headers });
            console.log("========================");
            console.log(response);
            console.log("========================");
            if (response.data == true) {
                localStorage.clear();
                window.location.href="/"
                console.log("password changed")
                resolve(true);
            } else {
                resolve(false);
            }

        } catch {
            reject(false);
        }
    });
}


