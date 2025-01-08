import ListItem from "./ListItem";
import { FaLayerGroup } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const rooms = [
    { id: 1, name: "General Chat" },
    { id: 2, name: "Project Updates" },
    { id: 3, name: "Random Thoughts" },
    { id: 4, name: "Team Discussions" },
    { id: 5, name: "Technical Support" },
    { id: 6, name: "Daily Standup" },
    { id: 7, name: "Fun and Games" },
    { id: 8, name: "Announcements" },
    { id: 9, name: "Feedback Room" },
    { id: 10, name: "Bug Reports" },
    { id: 11, name: "Feature Requests" },
    { id: 12, name: "Off-topic" },
    { id: 13, name: "Learning Resources" },
    { id: 14, name: "Code Reviews" },
    { id: 15, name: "Event Planning" }
];

export default function RoomList() {
    const searchParams = useSearchParams()
    const path = usePathname()
    const params = useParams()
    const roomId = params.roomId ? params.roomId : searchParams.get('room')
    
    return (
        <div className="px-2">
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
        </div>
    );
}