import { FaPaperPlane } from "react-icons/fa6";
import Message from '@/components/Message';

const messages = [
    {
        id: 0,
        message: "Hello World!",
        date: "2023-10-01T12:30:00",
        owner: {
            id: 0,
            name: "Alice Johnson"
        }
    },
    {
        id: 1,
        message: "This is a test message.",
        date: "2023-10-02T14:00:00",
        owner: {
            id: 1,
            name: "Bob Smith"
        }
    },
    {
        id: 2,
        message: "How are you doing?",
        date: "2023-10-03T16:15:00",
        owner: {
            id: 1,
            name: "Bob Smith"
        }
    },
    {
        id: 3,
        message: "Looking forward to the meeting.",
        date: "2023-10-04T09:00:00",
        owner: {
            id: 2,
            name: "Clara Williams"
        }
    },
    {
        id: 4,
        message: "Have a great day!",
        date: "2023-10-05T10:45:00",
        owner: {
            id: 3,
            name: "David Brown"
        }
    },
    {
        id: 5,
        message: "Let's collaborate on the project.",
        date: "2023-10-06T15:30:00",
        owner: {
            id: 4,
            name: "Ella Davis"
        }
    },
    {
        id: 6,
        message: "Check out this new feature!",
        date: "2023-10-07T11:00:00",
        owner: {
            id: 5,
            name: "Frank Wilson"
        }
    },
    {
        id: 7,
        message: "Do you need any help?",
        date: "2023-10-08T13:25:00",
        owner: {
            id: 5,
            name: "Frank Wilson"
        }
    },
    {
        id: 8,
        message: "I'm available for a call.",
        date: "2023-10-09T17:10:00",
        owner: {
            id: 6,
            name: "Grace Martinez"
        }
    },
    {
        id: 9,
        message: "The deadline is approaching!",
        date: "2023-10-10T19:45:00",
        owner: {
            id: 7,
            name: "Henry Lee"
        }
    },
    {
        id: 10,
        message: "Thanks for your support.",
        date: "2023-10-11T08:20:00",
        owner: {
            id: 8,
            name: "Ivy Clark"
        }
    },
    {
        id: 11,
        message: "I appreciate your effort!",
        date: "2023-10-12T14:50:00",
        owner: {
            id: 9,
            name: "Jack Lewis"
        }
    },
    {
        id: 12,
        message: "Let's schedule a meeting.",
        date: "2023-10-13T12:00:00",
        owner: {
            id: 10,
            name: "Katie Walker"
        }
    },
    {
        id: 13,
        message: "Happy Birthday!",
        date: "2023-10-14T09:30:00",
        owner: {
            id: 11,
            name: "Liam Young"
        }
    },
    {
        id: 14,
        message: "Congratulations on your achievement!",
        date: "2023-10-15T15:40:00",
        owner: {
            id: 11,
            name: "Liam Young"
        }
    },
    {
        id: 15,
        message: "Please review the document.",
        date: "2023-10-16T16:20:00",
        owner: {
            id: 12,
            name: "Mia King"
        }
    },
    {
        id: 16,
        message: "Can we reschedule the meeting?",
        date: "2023-10-17T10:00:00",
        owner: {
            id: 13,
            name: "Noah Scott"
        }
    },
    {
        id: 17,
        message: "I'll share the update soon.",
        date: "2023-10-18T13:45:00",
        owner: {
            id: 13,
            name: "Noah Scott"
        }
    },
    {
        id: 18,
        message: "Thank you for your patience.",
        date: "2023-10-19T18:10:00",
        owner: {
            id: 14,
            name: "Olivia Moore"
        }
    },
    {
        id: 19,
        message: "Let's keep in touch.",
        date: "2023-10-20T21:30:00",
        owner: {
            id: 15,
            name: "Peter White"
        }
    }
];

export default async function Room({ params }) {
    const { roomId } = await params
    return (
        <div 
            className="is-flex 
            is-flex-direction-column"
        
            style={{
                height: "100%"
            }}
        >
            {/* <div>
                Room ID: {id}
            </div> */}
            <div className="is-flex-grow-1 is-flex-direction-column-reverse is-align-content-flex-end"
                style={{
                    overflowY: 'scroll',
                    marginBottom: '1rem'
                }}
            >

                {messages.map((m, id)=>{
                    return (
                    <Message
                        key={id}
                        msg={m}
                        prevMsg={id > 0 ? messages[id-1] : null}
                    />)
                })}

            </div>
            <div className="field is-grouped">
                <input className="input" type="text" placeholder="Type a message..."/>
                <button className="button">
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
}