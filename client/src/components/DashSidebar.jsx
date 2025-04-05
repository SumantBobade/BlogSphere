import { Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
    const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
    useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    }, [location.search]);
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
    <Sidebar className='w-full md:w-56'>
          <SidebarItemGroup>
              <Link to='/dashboard?tab=profile'>
        <SidebarItem active={tab==='profile'} icon={HiUser} label="User" labelColor="dark">
          Profile
        </SidebarItem>
        </Link>
        <SidebarItem icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </SidebarItem>
      </SidebarItemGroup>
    </Sidebar>
  );
}