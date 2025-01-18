'use client'
import axios from "axios";
import { useMainContext } from "@/app/mainContext";

export function useAxios() {
    const { addToast } = useMainContext()

    function getApiUrl(route) {
        return process.env.NEXT_PUBLIC_API + route
    }

    function handleError(error) {
        const response = error?.response
        if (response) {
            const data = response.data
            const status = response.status
            if (data.error) { addToast(data.error, 'is-danger') }
            else { addToast(error.message, 'is-danger') }
            
            if (status == 401) {
                const url = getApiUrl('/session')
                axios.get(url)
                .then((response) => {
                const data = response.data;
                setUserId(data.userId)
                })
                .catch((error) => {
                setUserId(null)
                router.push("auth")
                })
            }
        } else {
            addToast(error.message, 'is-danger')
        }
    }

    return {
        axios,
        handleError,
        getApiUrl
    }
}