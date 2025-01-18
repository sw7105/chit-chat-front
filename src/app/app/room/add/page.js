"use client";
import { FaUserPlus } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppContext } from "../../appContext";
import { useAxios } from "@/hooks/useAxios";
import { useMainContext } from "@/app/mainContext";

export default function Auth() {
  const router = useRouter();
  const [tab, setTab] = useState("join");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)

  const { axios, handleError, getApiUrl } = useAxios()

  const { addToast } = useMainContext()
  const { setIsPageLoading } = useAppContext()
  useEffect(()=>{
      setIsPageLoading(false)
  }, [])

  useEffect(()=>{
    setError(false)
  }, [value])

  function handleSubmit(e) {
    e.preventDefault();

    if (tab == "join") {
      const url = getApiUrl('/join')
      axios.post(url, {
        code: value
      })
      .then((response) => {
        const data = response.data
        addToast('Joined room!', 'is-success')
        router.push("/app/room/"+data.roomId)
      })
      .catch((error) => {
        handleError(error)
        setError(true)
        setIsLoading(false)
      })
      setIsLoading(true)
    } else if (tab == "create") {
      const url = getApiUrl('/room')
      axios.post(url, {
        name: value
      })
      .then((response) => {
        const data = response.data;
        addToast('Room created!', 'is-success')
        router.push("/app/room/"+data.roomId)
      })
      .catch((error) => {
        handleError(error)
        setError(true)
        setIsLoading(false)
      })
      setIsLoading(true)
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
      <h1 className="title">Enter a room</h1>
      <div
        className="panel p-5"
        style={{
          maxWidth: "600px",
        }}
      >
        <div className="tabs is-centered">
          <ul>
            <li className={tab == "join" ? "is-active" : ""}>
              <a
                onClick={() => {
                  setTab("join");
                }}
              >
                <span className="icon is-small">
                  <FaSignInAlt />
                </span>
                <span>Join</span>
              </a>
            </li>
            <li className={tab == "create" ? "is-active" : ""}>
              <a
                onClick={() => {
                  setTab("create");
                }}
              >
                <span className="icon is-small">
                  <FaUserPlus />
                </span>
                <span>Create</span>
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">
              {tab == "join"
                ? "Invite Code"
                : tab == "create"
                  ? "Room Name"
                  : ""}
            </label>
            <div className="control">
              <input
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                className={`input ${error != false ? 'is-danger' : ''}`}
                type="text"
                placeholder={
                  tab == "join"
                    ? "Invite Code"
                    : tab == "create"
                      ? "Room Name"
                      : ""
                }
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                disabled={
                  value == ""
                }
                className={`button is-primary is-fullwidth ${isLoading ? "is-loading" : ""} ${error != false ? 'is-danger' : ''}`}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
