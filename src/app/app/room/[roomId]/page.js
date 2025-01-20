'use client'
import { FaPaperPlane } from "react-icons/fa6";
import Message from '@/components/Message';
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../appContext";
import { useStorageState } from "@/hooks/useStorageState";
import { useParams } from "next/navigation";
import { useAxios } from "@/hooks/useAxios";

export default function Room() {
    const { roomId } = useParams()
    const { setIsPageLoading, setIsPageError } = useAppContext()
    const [ messages, setMessages, messagesLoaded ] = useStorageState(`messages-room-${roomId}`, [])
    
    const { axios, handleError, getApiUrl } = useAxios()
    useEffect(()=>{
        if (messagesLoaded == false) { return }
        const url = getApiUrl(`/read?roomId=${roomId}${messages.length > 0 ? `&lastMessageId=${messages[messages.length-1].id}` : ''}`)
        axios.get(url)
        .then((response)=>{
            const data = response.data
            const newMessages = data.messages.filter(itemNew => 
                !messages.some(itemOld => itemOld.id === itemNew.id)
            );
            const sortMessages = [...messages, ...newMessages].sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            setMessages(sortMessages)
        })
        .catch((error)=>{
            handleError(error)
            setIsPageError(true)
        })
        .finally(()=>{
            setIsPageLoading(false)
        })
        setIsPageLoading(true)
    }, [messagesLoaded])

    useEffect(()=>{
        const refreshInterval = setInterval(refreshMessages, 1000)
        return ()=>{
            clearInterval(refreshInterval)
        }
    }, [])

    function refreshMessages() {
        const url = getApiUrl(`/read?roomId=${roomId}${messages.length > 0 ? `&lastMessageId=${messages[messages.length-1].id}` : ''}`)
        axios.get(url)
        .then((response)=>{
            const data = response.data
            if (data.messages.length > 0) {
                const newMessages = data.messages.filter(itemNew => 
                    !messages.some(itemOld => itemOld.id === itemNew.id)
                );
                const sortMessages = [...messages, ...newMessages].sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
                setMessages(sortMessages)
            }
        })
        .catch((error)=>{
            handleError(error)
            setIsPageError(true)
        })
    }

    const messageList = useRef(null)
    function scrollToBottom() {
        if (messageList.current) {
            messageList.current.scrollTop = messageList.current.scrollHeight;
        }
    }

    const [ message, setMessage ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    function handleSubmit(e) {
        e.preventDefault()
        setMessage("")

        const url = getApiUrl('/send')
        axios.post(url, {
            roomId: parseInt(roomId),
            message: message
        })
        .then((response)=>{
            const data = response.data
            setMessages([...messages, data])
        })
        .catch((error)=>{
            handleError(error)
            setError(true)
        })
        .finally(()=>{
            setIsLoading(false)
        })
        setIsLoading(true)
        scrollToBottom(true)
    }

    function handleEnter(e) {
        if (e.code != "Enter" || message.length == 0) {return}
        handleSubmit(e)
    }

    useEffect(()=>{
        setError(false)
    }, [message])

    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const prevMessages = useRef(null)
    useEffect(()=>{
        if (!isUserScrolling) {
            if (!prevMessages.current || messages.length > prevMessages.current.length) {
                scrollToBottom()
            }
        }
        prevMessages.current = messages
    }, [messages])

    function handleScroll() {
        if (messageList.current) {
            const { scrollTop, clientHeight, scrollHeight } = messageList.current;
            setIsUserScrolling(scrollTop + clientHeight < scrollHeight - 50);
        }
    }


    return (
        <div 
            className="is-flex 
            is-flex-direction-column"
        
            style={{
                height: "100%",
            }}
        >
            <div ref={messageList} onScroll={handleScroll} className="is-flex-grow-1 is-flex-direction-column-reverse is-align-content-flex-end"
                style={{
                    overflowY: 'scroll',
                    marginBottom: '1rem',
                }}
            >

                {Array.isArray(messages) && messages.map((m, id)=>{
                    return (
                    <Message
                        key={id}
                        msg={m}
                        prevMsg={id > 0 ? messages[id-1] : null}
                    />)
                })}

            </div>
            <div className="field is-grouped">
                <input value={message} onKeyDown={handleEnter} onChange={(e)=>{setMessage(e.target.value)}} className={`input ${error != false ? 'is-danger' : ''}`} type="text" placeholder="Type a message..."/>
                <button disabled={message.length == 0} className={`button ${error != false ? 'is-danger' : ''} ${isLoading ? 'is-loading' : ''}`} onClick={handleSubmit}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
}