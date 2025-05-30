import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage"; 
import { app } from '../firebase.js'; // Ensure this is uncommented and correctly set up
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({ title: '', category: '', content: '', image: '' });
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleUploadImage = async () => {
        if (!file) {
            setImageUploadError('Please select an image');
            return false; // Indicate failure
        }

        try {
            const storage = getStorage(app);
            const fileName = `${new Date().getTime()}-${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise((resolve, reject) => { // Return a Promise
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setImageUploadProgress(progress.toFixed(0));
                    },
                    (error) => {
                        setImageUploadError('Image upload failed');
                        setImageUploadProgress(null);
                        reject('Image upload failed'); // Reject the promise on error
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImageUploadProgress(null);
                            setImageUploadError(null);
                            setFormData((prevData) => ({ ...prevData, image: downloadURL }));
                            resolve(); // Resolve the promise
                        });
                    }
                );
            });
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.error(error);
            return false; // Indicate failure
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleContentChange = (content) => {
        setFormData((prevData) => ({ ...prevData, content }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/post/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
    
          if (res.ok) {
            setPublishError(null);
            navigate(`/post/${data.slug}`);
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
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
                        name='title'
                        className='flex-1'
                        onChange={handleInputChange}
                    />
                    <Select
                        required
                        name='category'
                        onChange={handleInputChange}
                    >
                        <option value="">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                        <option value="python">Python</option>
                        <option value="ml">Machine Learning</option>
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
                        disabled={imageUploadProgress !== null}
                    >
                        {imageUploadProgress !== null ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            </div>
                        ) : 'Upload Image'}
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                    <img src={formData.image} alt='Uploaded' className='w-full h-72 object-cover' />
                )}
                <ReactQuill
                    theme='snow'
                    placeholder='Write Something...'
                    className='h-72 mb-12'
                    required
                    onChange={handleContentChange}
                />
                <Button
                    type='submit'
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800"
                >
                    Publish
                </Button>
                {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
            </form>
        </div>
    );
}