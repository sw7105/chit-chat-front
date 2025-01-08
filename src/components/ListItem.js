
import { useState } from "react";

export default function ListItem({children, isActive=false, icon=null, href=null}) {
    const [_isActive, setIsActive] = useState(isActive)
    
    return (
        <a href={href} className="panel p-2 mb-1"
            style={{
                cursor: "pointer",
                background: _isActive ? "var(--bulma-border-weak)" : '',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--bulma-text)',
            }}
            onClick={()=>{setIsActive(!_isActive)}}
        >
            {icon && (
            <span className="icon is-medium">
                {icon}
            </span>
            )}
            <span style={{
                overflowX: 'hidden',
            }}>
            {children}
            </span>
        </a>
    );
}