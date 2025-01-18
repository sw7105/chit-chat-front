"use client";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMainContext } from "@/app/mainContext";
import { FaPencil } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useAxios } from "@/hooks/useAxios";
import { useAppContext } from "../../appContext";

export default function Profile({ params }) {
    const [ tab, setTab ] = useState('view')
    const { userId, addToast } = useMainContext()
    const { setIsPageLoading, setIsPageError } = useAppContext()
    var { profileId, roomId } = use(params);
    const searchParams = useSearchParams();
    if (roomId == undefined) roomId = searchParams.get("room");
    const isUserPage = userId == profileId

    // Profile
    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")

    // Edit
    const [ editName, setEditName ] = useState("")
    const [ editDescription, setEditDescription ] = useState("")
    const [ editError, setEditError ] = useState(false)
    const [ isEditLoading, setIsEditLoading] = useState(false)

    const { axios, handleError, getApiUrl } = useAxios() 
    useEffect(()=>{
        const url = getApiUrl(`/profile?userId=${profileId}`)
        axios.get(url)
        .then((response)=>{
            const data = response.data
            setName(data.name)
            setEditName(data.name)
            setDescription(data.description)
            setEditDescription(data.description)
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
        e.preventDefault()

        const url = getApiUrl(`/profile`)
        axios.put(url, {
            name: editName,
            description: editDescription
        })
        .then((response)=>{
            const data = response.data
            setName(data.name)
            setEditName(data.name)
            setDescription(data.description)
            setEditDescription(data.description)
            addToast('Updated profile successfully!', 'is-success')
        })
        .catch((error)=>{
            handleError(error)
            setEditError(true)
        })
        .finally(()=>{
            setIsEditLoading(false)
        })
        setIsEditLoading(true)
    }

    function cancelEdit(e) {
        setEditName(name)
        setEditDescription(description)
    }

    useEffect(()=>{
        setEditError(false)
    }, [editName, editDescription])

    return (
        <div>
            {roomId && (
                <a href={`/app/room/${roomId}`}>
                    <button className="button">Return to Chat</button>
                    <br />
                </a>
            )}
            <div className="section">
            {isUserPage && 
            <div className="tabs is-centered">
                <ul>
                    <li className={tab == "view" ? "is-active" : ""}>
                    <a
                        onClick={() => {
                        setTab("view");
                        }}
                    >
                        <span className="icon is-small">
                        <FaUser />
                        </span>
                        <span>Profile</span>
                    </a>
                    </li>
                    <li className={tab == "edit" ? "is-active" : ""}>
                    <a
                        onClick={() => {
                        setTab("edit");
                        }}
                    >
                        <span className="icon is-small">
                        <FaPencil />
                        </span>
                        <span>Edit</span>
                    </a>
                    </li>
                </ul>
                </div>
                }
                
                {tab == 'view' && (
                <div>
                <h1 className="title">{name}</h1>
                <p>{description ? description : "No description..."}</p>
                </div>
                )}
                {tab == 'edit' && (
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                        <input
                            value={editName}
                            onChange={(e) => {
                            setEditName(e.target.value);
                            }}
                            className={`input ${editError ? "is-danger" : ""}`}
                            type="text"
                            placeholder="Name"
                        />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                        <textarea
                            value={editDescription}
                            onChange={(e) => {
                            setEditDescription(e.target.value);
                            }}
                            className={`input ${editError ? "is-danger" : ""}`}
                            placeholder="Tell something about yourself..."
                            style={{
                                minHeight: '128px'
                            }}
                        />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button
                            disabled={
                            editError != false ||
                            isEditLoading ||
                            editName == "" ||
                            (editName == name && editDescription == description) 
                            }
                            className={`button is-primary ${isEditLoading ? "is-loading" : ""} ${editError ? "is-danger" : ""}`}
                        >
                            Save Changes
                        </button>
                        <button
                            disabled={
                            editError != false ||
                            isEditLoading ||
                            (editName == name && editDescription == description) 
                            }
                            className={`button ml-2 ${isEditLoading ? "is-loading" : ""} ${editError ? "is-danger" : ""}`}
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                        </div>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}
