import ListItem from "./ListItem";
import { FaUser } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const people = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
    { id: 5, name: "Charlie Davis" },
    { id: 6, name: "Diana Evans" },
    { id: 7, name: "Ethan Harris" },
    { id: 8, name: "Fiona Clark" },
    { id: 9, name: "George Lewis" },
    { id: 10, name: "Hannah Walker" },
    { id: 11, name: "Ian Martinez" },
    { id: 12, name: "Julia Wilson" },
    { id: 13, name: "Kevin Moore" },
    { id: 14, name: "Lily Scott" },
    { id: 15, name: "Mason Young" },
    { id: 16, name: "Natalie Adams" },
    { id: 17, name: "Oliver Turner" },
    { id: 18, name: "Paige White" },
    { id: 19, name: "Quinn Hall" },
    { id: 20, name: "Ruby King" }
  ];
  

export default function UserList() {
    const searchParams = useSearchParams()
    const path = usePathname()
    const params = useParams()
    const roomId = params.roomId ? params.roomId : searchParams.get('room')
    const profileId = params.profileId

    return (
        <div className="px-2">
            {people.map((user)=>{
                return (
                    <ListItem isActive={user.id == profileId} href={`/app/profile/${user.id}${roomId ? `?room=${roomId}` : ''}`} key={user.id} icon={<FaUser />}>
                    {user.name}
                    </ListItem>
                )
            })}
            {roomId && (
            <ListItem isActive={path == `/app/room/${roomId}/invite`} href={`/app/room/${roomId}/invite`} icon={<FaEnvelope />}>
                Invite People
            </ListItem>
            )}
        </div>
    );
}