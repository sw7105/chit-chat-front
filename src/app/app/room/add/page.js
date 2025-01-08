'use client'
import { FaUserPlus } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

export default function Auth() {
  const router = useRouter()
  const [tab, setTab] = useState('join')
  const [value, setValue] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    setTimeout(()=>{
      router.push('/app')
    }, 1000)
  }

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10rem',
      flexDirection: 'column'
    }}>
      <h1 className="title">Enter a room</h1>
      <div className="panel p-5"
        style={{
          maxWidth: '600px'
        }}
      >
        <div className="tabs is-centered">
          <ul>
            <li className={tab == 'join' ? 'is-active' : ''}>
              <a onClick={()=>{setTab('join')}}>
                <span className="icon is-small"><FaSignInAlt /></span>
                <span>Join</span>
              </a>
            </li>
            <li className={tab == 'create' ? 'is-active' : ''}>
              <a onClick={()=>{setTab('create')}}>
                <span className="icon is-small"><FaUserPlus /></span>
                <span>Create</span>
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">{tab == 'join' ? "Invite Code" : tab == 'create' ? "Room Name" : ""}</label>
          <div className="control">
            <input value={value} onChange={(e)=>{setValue(e.target.value)}} className={`input`} type="text" placeholder={tab == 'join' ? "Invite Code" : tab == 'create' ? "Room Name" : ""}/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className={`button is-primary is-fullwidth`}>Submit</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}