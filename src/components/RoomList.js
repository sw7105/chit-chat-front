import ListItem from "./ListItem";
import { FaLayerGroup } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "./Loading";

export default function RoomList() {
    const searchParams = useSearchParams()
    const path = usePathname()
    const params = useParams()
    const roomId = params.roomId ? params.roomId : searchParams.get('room')

    const { axios, handleError, getApiUrl } = useAxios()
    const [ rooms, setRooms ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ error, setError ] = useState(false)

    useEffect(()=>{
        refreshRooms()
    }, [])
    
    function refreshRooms() {
        const url = getApiUrl('/rooms')
        axios.get(url)
        .then((response) => {
            const data = response.data;
            setRooms(data.rooms)
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
            {error != false && <p>Error: <a onClick={refreshRooms}>Try Refreshing</a></p>}
            {!isLoading && error == false && (<div>
            {rooms.map((room)=>{
                return (
                    <ListItem isActive={room.id == roomId} href={`/app/room/${room.id}`} key={room.id} icon={<FaLayerGroup />}>
                    {room.name}
                    </ListItem>
                )
            })}
            <ListItem isActive={path == '/app/room/add'} href={'/app/room/add'} icon={<FaPlus />}>
                Join or Create Room
            </ListItem>
            </div>)}
        </div>
    );
}