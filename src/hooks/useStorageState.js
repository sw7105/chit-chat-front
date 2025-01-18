'use client'
import { useState, useEffect } from "react";

export function useStorageState(item, value=null) {
    const [state, setState] = useState(value);
    const [isStateLoaded, setIsStateLoaded] = useState(false)

    useEffect(() => {
        setState(JSON.parse(localStorage.getItem(item)) || value)
        setIsStateLoaded(true)
    }, [])

    useEffect(() => {
        if (state) {
            localStorage.setItem(item, JSON.stringify(state));
        } else {
            localStorage.removeItem(item);
        }
    }, [state]);

    return [state, setState, isStateLoaded]
}