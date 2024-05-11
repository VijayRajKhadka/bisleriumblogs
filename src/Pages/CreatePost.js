import { useState } from "react";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { get, set } from "firebase/database";
import { addBlog } from "../services/BlogServices";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { uploadPhoto } from "../config/Config";
import { getLocalStorageItem } from "../services/LocalStorageService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../Css/create_post.css"

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
        var success = false;
        if (getLocalStorageItem('token') === null) {
            alert("Please Login First");
            return;
        }

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
                            userId: getLocalStorageItem('userId').replace(/"/g, ''),
                            images: [
                                { imageLink: imageUrl },
                            ]
                        }
                        console.log("🚀 ~ handleCreatePost ~ payload:", payload)

                        success = await addBlog(payload);

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
                    userId: getLocalStorageItem('userId').replace(/"/g, ''),
                    images: [
                    ]
                }
                console.log("🚀 ~ handleCreatePost ~ payload:", payload)

                success = addBlog(payload);
                handelClear()
            }

            if (success) {
                toast.success(' Successful!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
            }




        } else {
            console.log('Validation failed');
            toast.error('Login Failed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
            });
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


            <div className="content">
                <div className="create-post-container h-screen">
                    <h2 className="create-post-head">Create a New Blog</h2>
                    <form action="#" method="POST" encType="multipart/form-data">
                        <div className="mb-4">
                            <br />
                            <label htmlFor="title" className="block text-white font-bold mb-2">Blog Title</label>
                            <input type="text" id="title" name="title" value={title} className="create-post-input" onChange={(e) => titleValidator(e.target.value)} />
                            {titleError && <span className="text-red-600">**{titleError}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-white font-bold mb-2 ">Blog Content</label>
                            <textarea id="content" name="content" value={content} rows="4" className="comment-input" onChange={(e) => contentValidator(e.target.value)}></textarea>
                            {contentError && <span className="text-red-600">**{contentError}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-white font-bold mb-2">Blog Image</label>
                            <input type="file" id="image" name="image" files={image} accept="image/*" className="form-input w-full text-white rounded-md border border-white bg-transparent" onChange={(e) => imageValidator(e.target.files[0])} />
                            {imageError && <span className="text-red-600">**{imageError}</span>}
                        </div>
                        <br />
                        <div className="w-full justify-between ">
                            <span className="bg-transparent text-white border-white border py-2 px-4 rounded-md mr-5 w-1/2 hover:cursor-pointerbg-transparent text-white border-white border py-2 px-4 rounded-md mr-5 w-1/2 hover:cursor-pointer hover:bg-teal-400" onClick={handleCreatePost} >Create Post</span>
                            <span className="bg-transparent text-white border-white border py-2 px-4 rounded-md mr-5 w-1/2 hover:cursor-pointerbg-transparent text-white border-white border py-2 px-4 rounded-md mr-5 w-1/2 hover:cursor-pointer hover:bg-red-500" onClick={handelClear}>Clear</span>
                        </div>

                    </form>
                </div>
                <ToastContainer />
            </div>
        </div >
    );
}

export default CreatePost;