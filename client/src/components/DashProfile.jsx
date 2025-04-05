import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    // console.log(imageFile, imageFileUrl);
    useEffect(() => {
        if (imageFile) {
            uploadingImage();
        }
    }, [imageFile]);

    const uploadingImage = async () => {
        console.log('uploading image...');
    };

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess()); // Invoke the action creator
            }
            
        } catch (error) {
            console.log(error.message);
        }
    };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
          <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
          <form className='flex flex-col gap-4'>
              <input type="file" accept='image/*' onChange={handleImageChange}/>
              <div className="w-40 h-40 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                  <img src={imageFileUrl || currentUser.profilePicture} alt='user'
                      className='rounded-full w- h-full  border-[lightgray]' />
              </div>
              <TextInput type='text'
                  id='username'
                  placeholder='username'
                  defaultValue={currentUser.username}
              />
              <TextInput type='email'
                  id='email'
                  placeholder='username'
                  defaultValue={currentUser.email}
              />
              <TextInput type='password'
                  id='password'
                  placeholder='password'
              />
              <Button type='submit' className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800" outline>
                  Update
              </Button>
          </form>  
          <div className='text-red-500 flex justify-between mt-5'>
              <span className='cursor-pointer'>Delete Account</span>
              <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
          </div>
    </div>
  )
}
