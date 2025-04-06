import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage"; // Added import for 'ref'
import { app } from '../firebase.js'; // Ensure your firebase setup is correct
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({ title: '', category: '', content: '' });

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            const storage = getStorage(app); // Make sure `app` is correctly initialized
            const fileName = new Date().getTime() + '-' + file.name; // Fixed typo
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (content) => {
        setFormData({ ...formData, content });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form data submission here
        console.log('Form Data:', formData);
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        name='title'
                        onChange={handleInputChange}
                        className='flex-1'
                    />
                    <Select
                        required
                        name='category'
                        onChange={handleInputChange}
                    >
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">next.js</option>
                        <option value="python">Python</option>
                        <option value="ml">ML</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800"
                        outline
                        onClick={handleUploadImage}
                        disabled={imageUploadProgress}
                    >
                        {
                            imageUploadProgress ?
                                <div className='w-16 h-16'>
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                </div> : 'Upload Image'
                        }
                    </Button>
                </div>
                {
                    imageUploadError && (
                        <Alert color='failure'>
                            {imageUploadError}
                        </Alert>
                    )
                }
                {formData.image && (
                    <img
                        src={formData.image}
                        alt='upload'
                    className='w-full h-72 object-cover'/>
                )}
                <ReactQuill
                    theme='snow'
                    placeholder='Write Something...'
                    className='h-72 mb-12'
                    onChange={handleContentChange}
                    required
                />
                <Button
                    type='submit'
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
                >
                    Publish
                </Button>
            </form>
        </div>
    );
}