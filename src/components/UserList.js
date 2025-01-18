import ListItem from "./ListItem";
import { FaUser } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "./Loading";
import { useAppContext } from "@/app/app/appContext";

export default function UserList() {
    const searchParams = useSearchParams();
    const path = usePathname();
    const params = useParams();
    const roomId = params.roomId ? params.roomId : searchParams.get("room");
    const profileId = params.profileId;

    const { axios, handleError, getApiUrl } = useAxios()
    const { roomOwnerId, setRoomOwnerId } = useAppContext()
    const [ people, setPeople ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    useEffect(()=>{
        refreshPeople()
    }, [])
    
    function refreshPeople() {
        const url = getApiUrl('/room')
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

    return (
        <div className="px-2">
            {isLoading && <Loading />}
            {error != false && <p>Error: <a onClick={refreshPeople}>Try Refreshing</a></p>}
            {!isLoading && error == false && (<div>
            {people.map((user) => {
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
            {roomId && (
                <ListItem
                    isActive={path == `/app/room/${roomId}/invite`}
                    href={`/app/room/${roomId}/invite`}
                    icon={<FaEnvelope />}
                >
                    Invite People
                </ListItem>
            )}
            </div>)}
        </div>
    );
}
