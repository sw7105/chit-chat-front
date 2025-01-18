'use client'
import { createContext, useContext, useState, useEffect } from "react";
import RoomList from '@/components/RoomList';
import UserList from '@/components/UserList';
import SideBar from '@/components/SideBar';
import { useSessionState } from "@/hooks/useSessionState";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";

import { FaPeopleGroup } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";

const AppContext = createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export function AppContextProvider({ children }) {
    const [isPageLoading, setIsPageLoading] = useState(true)
    const [isPageError, setIsPageError] = useState(false)
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useSessionState('isLeftSidebarOpen', false)
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useSessionState('isRightSidebarOpen', false)
    const [roomOwnerId, setRoomOwnerId] = useSessionState('roomOwnerId', null)

    return (
        <AppContext.Provider
            value={{
                isPageLoading,
                isPageError,
                setIsPageLoading,
                setIsPageError,
                roomOwnerId,
                setRoomOwnerId
            }}
        >
            <div className="columns is-mobile" 
            style={{
                height: "100vh", 
                margin: 0,
                justifyContent: "center"
            }}
            >
                <SideBar isOpen={isLeftSidebarOpen} setIsOpen={setIsLeftSidebarOpen} isRight={false} title='Rooms' icon={<FaMessage />}>
                <RoomList/>
                </SideBar>
                <div className="column"
                style={{
                    maxWidth: '800px',
                    padding: '1rem 64px' 
                }}
                >
                    {isPageLoading && <Loading />}
                    {isPageError && <Error />}
                    {!isPageError && <div style={{height: '100%'}} hidden={isPageLoading}>{children}</div>}
                </div>
                <SideBar isOpen={isRightSidebarOpen} setIsOpen={setIsRightSidebarOpen} isRight={true} title='People' icon={<FaPeopleGroup />}>
                <UserList/>
                </SideBar>
            </div>
        </AppContext.Provider>
    )
}