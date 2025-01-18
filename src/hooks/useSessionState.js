'use client'
import { useState, useEffect } from "react";

export function useSessionState(item, value=null) {
    const [state, setState] = useState(value);

    useEffect(() => {
        setState(sessionStorage.getItem(item) || value)
    }, [])

    useEffect(() => {
        if (state) {
            sessionStorage.setItem(item, state);
        } else {
            sessionStorage.removeItem(item);
        }
    }, [state]);

    return [state, setState]
}