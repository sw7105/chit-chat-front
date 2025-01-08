'use client'
import { use } from "react"

export default function RoomInvite({ params }) {
    var { roomId } = use(params)
    
    return (
        <div>
            {roomId && (
            <a href={`/app/room/${roomId}`}>
            <button className="button">Return to Chat</button><br/>
            </a>
            )}
            Invite to room: {roomId}
        </div>
    )
}