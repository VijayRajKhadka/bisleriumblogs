import axios from "axios";

export const registerUser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await axios.post("https://localhost:7216/api/authenticate/register", payload, { headers: headers });
        console.log(response);
    });
}


export const loginUser = async (payload) => {
    return new Promise(async (resolve, reject) => {
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await axios.post("https://localhost:7216/api/authenticate/login", payload, { headers: headers });
        console.log(response);
    });
}


