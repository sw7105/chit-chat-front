import ListItem from "./ListItem";
import { FaUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa6";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "./Loading";
import { useAppContext } from "@/app/app/appContext";
import { useMainContext } from "@/app/mainContext";
import { useRouter } from "next/navigation";

export default function UserList() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const path = usePathname();
    const params = useParams();
    const roomId = params.roomId ? parseInt(params.roomId) : parseInt(searchParams.get("room"));
    const profileId = params.profileId;

    const { axios, handleError, getApiUrl } = useAxios()
    const { roomOwnerId, setRoomOwnerId } = useAppContext()
    const { setUserId, setUsername, addToast } = useMainContext()
    const { userId, username } = useMainContext()
    const [ people, setPeople ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    useEffect(()=>{
        refreshPeople()
    }, [])
    
    function refreshPeople() {
        if (!roomId) { 
            setIsLoading(false)
            return 
        }
        const url = getApiUrl(`/room?roomId=${roomId}`)
        axios.get(url)
        .then((response) => {
            const data = response.data;
            setPeople(data.users)
            setRoomOwnerId(data.ownerId)
        })
        .catch((error) => {
            handleError(error)
            setError(true)
        })
        .finally(()=>{
            setIsLoading(false)
        })
        setIsLoading(true)
        setError(false)
    }

    function handleLogout() {
        const url = getApiUrl('/logout')
        axios.get(url)
        .then((response) => {
            const data = response.data;
            setUserId(null)
            setUsername(null)
            addToast("Log out success!", "is-success")
            router.replace('/auth')
        })
        .catch((error) => {
            handleError(error)
        })
    }

    return (
        <div className="px-2">
            {isLoading && <Loading />}
            {error != false && <p>Error: <a onClick={refreshPeople}>Try Refreshing</a></p>}
            {!isLoading && error == false && (<div>
            <div style={{
                display: 'flex',
            }}>
                <div style={{
                    width: '100%'
                }}>
                <ListItem
                    isActive={profileId != null && userId == profileId}
                    href={`/app/profile/${userId}${roomId ? `?room=${roomId}` : ""}`}
                    icon={<FaUserCircle />}
                >
                    {username}
                </ListItem>
                </div>
                <button onClick={handleLogout} className="button my-2"
                    style={{
                        marginLeft: '0.5rem',
                        padding: '0.5rem'
                    }}
                >
                        <FaDoorOpen />
                </button>
            </div>
            {people.map((user) => {
                if (user.id == userId) { return }
                return (
                    <ListItem
                        isActive={user.id == profileId}
                        href={`/app/profile/${user.id}${roomId ? `?room=${roomId}` : ""}`}
                        key={user.id}
                        icon={<FaUser />}
                    >
                        {user.name}
                    </ListItem>
                );
            })}
            {isNaN(roomId) == false && 
            <ListItem
                isActive={path == `/app/room/${roomId}/invite`}
                href={`/app/room/${roomId}/invite`}
                icon={<FaEnvelope />}
            >
                Invite People
            </ListItem>
            }
            </div>)}
        </div>
    );
}
