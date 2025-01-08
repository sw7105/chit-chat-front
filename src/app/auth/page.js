'use client'
import { FaUserPlus } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

export default function Auth() {
  const router = useRouter()
  const [tab, setTab] = useState('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  useEffect(()=>{
    setError(false)
  }, [username, password, password2])

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

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
      <h1 className="title">Chit-Chat</h1>
      <div className="panel p-5"
        style={{
          maxWidth: '600px'
        }}
      >
        <div className="tabs is-centered">
          <ul>
            <li className={tab == 'login' ? 'is-active' : ''}>
              <a onClick={()=>{setTab('login')}}>
                <span className="icon is-small"><FaSignInAlt /></span>
                <span>Log in</span>
              </a>
            </li>
            <li className={tab == 'register' ? 'is-active' : ''}>
              <a onClick={()=>{setTab('register')}}>
                <span className="icon is-small"><FaUserPlus /></span>
                <span>Register</span>
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input value={username} onChange={(e)=>{setUsername(e.target.value)}} className={`input ${error ? 'is-danger' : ''}`} type="text" placeholder="Username"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" className={`input ${error ? 'is-danger' : ''}`} type="password" placeholder="Password"/>
          </div>
        </div>
        {tab == 'register' && (
        <div className="field">
          <label className="label">Repeat Password</label>
          <div className="control">
            <input value={password2} onChange={(e)=>{setPassword2(e.target.value)}} name="password2" className={`input ${error ? 'is-danger' : ''}`} type="password" placeholder="Repeat password"/>
          </div>
        </div>
        )}
        <div className="field">
          <div className="control">
            <button disabled={error != false || isLoading} className={`button is-primary is-fullwidth ${isLoading ? 'is-loading' : ''} ${error ? 'is-danger' : ''}`}>Submit</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}