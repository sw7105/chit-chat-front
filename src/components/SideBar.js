'use client'
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function SideBar({ children, isRight=false, title="asd", icon=<FaBars/> }) {
    const [isOpen, setIsOpen] = useState(false)
    
    function toggleOpen(e) {
        setIsOpen(!isOpen)
    }

    return (
        <div className="panel ml-0 mr-auto"
          style={{
            position: 'fixed',
            top: 0,
            left: isRight ? "" : isOpen ? 0 : -216,
            right: !isRight ? "" : isOpen ? 0 : -216,
            width: "256px",
            height: "100vh",
            zIndex: 100,
            backgroundColor: "var(--bulma-background)",
            margin: 0,
            borderTopLeftRadius: isRight ? "" : 0,
            borderBottomLeftRadius: isRight ? "" : 0,
            borderTopRightRadius: !isRight ? "" : 0,
            borderBottomRightRadius: !isRight ? "" : 0,
            boxShadow: isOpen ? "0 0 5rem #000" : "0 0 1rem #000",
            display: 'flex',
            flexDirection: 'column'
          }}
        >
            <div className="title has-text-centered mb-2"
                style={{
                    fontWeight: 200
                }}
            >
                <button 
                    className="button is-text is-large p-2"
                    style={{
                        position: "absolute",
                        left: !isRight ? "" : 0,
                        right: isRight ? "" : 0,
                    }}
                    onClick={toggleOpen}
                >{icon}</button>
                {title}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'scroll',
            }}>
            {children}
            </div>
        </div>
    );
}