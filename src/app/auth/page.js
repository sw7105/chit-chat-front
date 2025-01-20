"use client";
import { FaUserPlus } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMainContext } from "@/app/mainContext";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/components/Loading";

export default function Auth() {
  const {axios, handleError, getApiUrl} = useAxios()
  const {setUserId, setUsername, addToast} = useMainContext()
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(()=>{
    const url = getApiUrl('/session')
    axios.get(url)
    .then((response) => {
      const data = response.data;
      setUserId(data.userId)
      router.replace("/app")
    })
    .catch((error) => {
      setIsPageLoading(false)
    })
    setIsPageLoading(true)
  }, [])

  useEffect(() => {
    setError(false);
  }, [name, login, password]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (tab == 'login') {
      const url = getApiUrl('/login')
      axios.post(url, {
        login: login,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        setUserId(data.userId)
        setUsername(data.name)
        addToast('Log in success!', 'is-success')
        router.replace("/app")
      })
      .catch((error) => {
        handleError(error)
        setError(true)
        setIsLoading(false)
      })
    } else if (tab == 'register') {
      const url = getApiUrl('/register')
      axios.post(url, {
        name: name,
        login: login,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        setUserId(data.userId)
        setUsername(data.name)
        addToast('Register success!', 'is-success')
        router.push("/app")
      })
      .catch((error) => {
        handleError(error)
        setError(true)
        setIsLoading(false)
      })
    }
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10rem",
        flexDirection: "column",
      }}
    >
      <h1 className="title">Chit-Chat</h1>
      {isPageLoading && <Loading />}
      {!isPageLoading && (
      <div
        className="panel p-5"
        style={{
          maxWidth: "600px",
        }}
      >
        <div className="tabs is-centered">
          <ul>
            <li className={tab == "login" ? "is-active" : ""}>
              <a
                onClick={() => {
                  setTab("login");
                }}
              >
                <span className="icon is-small">
                  <FaSignInAlt />
                </span>
                <span>Log in</span>
              </a>
            </li>
            <li className={tab == "register" ? "is-active" : ""}>
              <a
                onClick={() => {
                  setTab("register");
                }}
              >
                <span className="icon is-small">
                  <FaUserPlus />
                </span>
                <span>Register</span>
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          {tab == "register" && (
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className={`input ${error ? "is-danger" : ""}`}
                  type="text"
                  placeholder="Name"
                />
              </div>
            </div>
          )}
          <div className="field">
            <label className="label">Login</label>
            <div className="control">
              <input
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
                className={`input ${error ? "is-danger" : ""}`}
                type="text"
                placeholder="Login"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className={`input ${error ? "is-danger" : ""}`}
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                disabled={
                  error != false ||
                  isLoading ||
                  (tab == "register" && name == "") ||
                  login == "" ||
                  password == ""
                }
                className={`button is-primary is-fullwidth ${isLoading ? "is-loading" : ""} ${error ? "is-danger" : ""}`}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>)}
    </div>
    
  );
}
