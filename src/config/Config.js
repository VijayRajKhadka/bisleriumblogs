
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBSJXe-jYsWOCvcamUbgMN7_2WJubPH34U",
    authDomain: "bislerium-blogs-8cdd4.firebaseapp.com",
    projectId: "bislerium-blogs-8cdd4",
    storageBucket: "bislerium-blogs-8cdd4.appspot.com",
    messagingSenderId: "951278543780",
    appId: "1:951278543780:web:b448bfe1033a86b28e9731"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const uploadPhoto = getStorage(app);

// const [img, setImg] = useState(null);



// import { ref, uploadBytes } from "firebase/storage";
// import React, { useState } from "react";
// import { uploadPhoto } from "../config/Config";
// import { v4 } from "uuid";

// const handleClick = () => {
//     const imgRef = ref(
//         uploadPhoto, `files/${v4()}`
//     )

//     uploadBytes(imgRef, img)
// }
// return (
//     <div>
//         <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//         <button onClick={handleClick}>Upload</button>
//     </div>
// )