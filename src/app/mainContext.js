'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { ToastBar, useToasts } from "../components/Toast";
import { useSessionState } from "@/hooks/useSessionState";

const MainContext = createContext()

export function useMainContext() {
  return useContext(MainContext)
}

export function MainContextProvider({ children }) {
    const [userId, setUserId] = useSessionState('userId', null)
    const {toasts, addToast, removeToast} = useToasts()

    return (
        <MainContext.Provider
            value={{
                userId,
                setUserId,
                addToast
            }}
        >
            <ToastBar toasts={toasts} removeToast={removeToast}/>
            {children}
        </MainContext.Provider>
    )
}