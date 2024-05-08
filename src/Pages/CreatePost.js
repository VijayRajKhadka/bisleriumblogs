import { useState } from "react";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { set } from "firebase/database";
import { addBlog } from "../services/BlogServices";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { uploadPhoto } from "../config/Config";

const CreatePost = () => {
    //textFields Values
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    //errorMessages
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [imageError, setImageError] = useState('');


    //validator
    const titleValidator = (title) => {
        setTitle(title);
        if (title === '') {
            setTitleError('Title is required');
            return false
        } else {
            setTitleError('');
            return true
        }
    }

    const contentValidator = (content) => {
        setContent(content);
        if (content === '') {
            setContentError('Content is required');
            return false
        } else {
            setContentError('');
            return true
        }
    }

    const imageValidator = (image) => {
        setImage(image);
        if (image === null) {
            return true
        } else {
            if (image.size > 3 * 1024 * 1024) {
                setImageError('Image size should be less than 3MB');
                return false
            } else {
                setImageError('');
                return true
            }
        }
    }

    const handleCreatePost = () => {

        if (titleValidator(title) && contentValidator(content) && imageValidator(image)) {
            var imageUrl = null;

            if (image) {
                const imgRef = ref(
                    uploadPhoto, `files/${v4()}`
                )

                uploadBytes(imgRef, image)
                    .then(async (snapshot) => {
                        console.log('Uploaded a blob or file!', snapshot);
                        imageUrl = await getDownloadURL(imgRef);
                        console.log("🚀 ~ .then ~ imageUrl:", imageUrl)
                        const payload =
                        {
                            title: title,
                            content: content,
                            image: imageUrl,
                            postedBy: "Bislerium",
                            score: 0,
                            postedOn: "2021-10-10",
                            comments: 4,
                            id: 1,
                            likedByMe: true,
                            savedByMe: true,

                        }
                        console.log("🚀 ~ handleCreatePost ~ payload:", payload)

                        addBlog(payload);
                        handelClear();

                    })
                    .catch((error) => {
                        console.error('Error uploading file', error);
                    });



            } else {
                const payload =
                {
                    title: title,
                    content: content,
                    image: imageUrl,
                    postedBy: "Bislerium",
                    score: 0,
                    postedOn: "2021-10-10",
                    comments: 4,
                    id: 1,
                    likedByMe: true,
                    savedByMe: true,

                }
                console.log("🚀 ~ handleCreatePost ~ payload:", payload)

                addBlog(payload);
                handelClear()
            }




        } else {
            console.log('Validation failed');
        }
    }

    const handelClear = () => {
        setTitle('');
        setContent('');
        setImage(null);
        setTitleError('');
        setContentError('');
        setImageError('');
    }

    return (
        <div>
            <NavBar />
            <SideBar />


            <div className="max-w-2xl mx-auto bg-slate-600 m-8 p-8 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
                <form action="#" method="POST" encType="multipart/form-data">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-black font-bold mb-2">Blog Title</label>
                        <input type="text" id="title" name="title" value={title} className="form-input w-full rounded-md border-gray-300 p-2" onChange={(e) => titleValidator(e.target.value)} />
                        {titleError && <span className="text-red-600">**{titleError}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-black font-bold mb-2 ">Blog Content</label>

                        <textarea id="content" name="content" value={content} rows="4" className="form-textarea p-4 w-full rounded-md border-gray-300" onChange={(e) => contentValidator(e.target.value)}></textarea>
                        {contentError && <span className="text-red-600">**{contentError}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-black font-bold mb-2">Blog Image</label>
                        <input type="file" id="image" name="image" files={image} accept="image/*" className="form-input w-full rounded-md border-gray-300" onChange={(e) => imageValidator(e.target.files[0])} />
                        {imageError && <span className="text-red-600">**{imageError}</span>}
                    </div>
                    <div className="w-full justify-between ">
                        <span className="bg-blue-500 text-white py-2 px-4 rounded-md mr-5 w-1/2 hover:cursor-pointer" onClick={handleCreatePost} >Create Post</span>
                        <span className="bg-white text-blue-500 py-2 px-4 rounded-md w-1/2 hover:cursor-pointer" onClick={handelClear}>Clear</span>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreatePost;