'use client'
import { use } from "react"
import { useSearchParams } from "next/navigation"

export default function Profile({ params }) {
    var { profileId, roomId } = use(params)
    const searchParams = useSearchParams()
    if (roomId == undefined) roomId = searchParams.get('room')
    
    return (
        <div>
            {roomId && (
            <a href={`/app/room/${roomId}`}>
            <button className="button">Return to Chat</button><br/>
            </a>
            )}
            Profile User: {profileId}
        </div>
    )
}