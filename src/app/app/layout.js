'use client'
import RoomList from '@/components/RoomList';
import UserList from '@/components/UserList';
import SideBar from '@/components/SideBar';

import { useParams } from 'next/navigation';

import { FaPeopleGroup } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";

export default function AppLayout({ children }) {
  const params = useParams()
  const roomId = params.roomId
  return (
    <div className="columns is-mobile" 
      style={{
        height: "100vh", 
        margin: 0,
        justifyContent: "center"
      }}
    >
        <SideBar isRight={false} title='Rooms' icon={<FaMessage />}>
          <RoomList/>
        </SideBar>
        <div className="column"
          style={{
            maxWidth: '800px',
            padding: '1rem 64px' 
          }}
        >
            {children}
        </div>
        <SideBar isRight={true} title='People' icon={<FaPeopleGroup />}>
          <UserList/>
        </SideBar>
    </div>
  );
}