"use client";
import axios from "axios";
import { use, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";

import { useEffect } from "react";
import { useAppContext } from "../../../appContext";
import { useAxios } from "@/hooks/useAxios";
import { useMainContext } from "@/app/mainContext";

function generateRandomString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

export default function RoomInvite({ params }) {
    const { roomId } = use(params);
    const [value, setValue] = useState(generateRandomString(8));
    const [isLoading, setIsLoading] = useState(false);

    const { axios, handleError, getApiUrl } = useAxios()

    const { setIsPageLoading, setIsPageError, roomOwnerId } = useAppContext()

    const { addToast, userId } = useMainContext()
    useEffect(()=>{
        const url = getApiUrl(`/invite?roomId=${roomId}`)
        axios.get(url)
        .then((response)=>{
            const data = response.data
            setValue(data.code)
        })
        .catch((error)=>{
            handleError(error)
            setIsPageError(true)
        })
        .finally(()=>{
            setIsPageLoading(false)
        })
        setIsPageLoading(true)
        setIsPageError(false)
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        const url = getApiUrl('/invite')
        axios.post(url, {
            room: roomId,
        })
        .then((response) => {
            const data = response.data;
            setValue(data.code)
            addToast('Generated new code!', 'is-success')
        })
        .catch((error) => {
            handleError(error)
        })
        .finally(() => {
            setIsLoading(false);
        });
        setIsLoading(true);
    }

    return (
        <div>
            {roomId && (
                <a href={`/app/room/${roomId}`}>
                    <button className="button">Return to Chat</button>
                    <br />
                </a>
            )}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10rem",
                    flexDirection: "column",
                }}
            >
                <h1 className="title">Invite People</h1>
                <div
                    className="panel p-5"
                    style={{
                        maxWidth: "600px",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Share Room Code</label>
                            <div className="control">
                                <input
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                    }}
                                    className={`input`}
                                    type="text"
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        {userId == roomOwnerId &&
                        <div className="field">
                            <div className="control">
                                <button
                                    className={`button is-primary is-fullwidth ${isLoading ? "is-loading" : ""}`}
                                >
                                    <FaArrowsRotate />
                                </button>
                            </div>
                        </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
