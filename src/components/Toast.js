import { useState } from "react";

export function ToastBar({ toasts, removeToast }) {
    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '9999',
            maxWidth: '300px'
        }}>
            {toasts.map((toast, index) => (
                <Toast key={index} message={toast.message} type={toast.type} onClose={() => removeToast(index)} />
            ))}
        </div>
    )
}

export function Toast({ message, type, onClose }) {
    return (
        <div className={`notification is-light ${type}`}
            style={{
                paddingRight: '3rem',
            }}
        >
            {message}
            <button className="delete" onClick={onClose}></button>
        </div>
    )
}

export function useToasts() {
    const [toasts, setToasts] = useState([]);
    const [toastIndex, setToastIndex] = useState(0)

    const addToast = (message, type='is-link') => {
        const id = toastIndex
        const toast = { id, message, type }
        setToasts((prevToasts) => [...prevToasts, toast]);
        setTimeout(()=>{
            removeToastById(id)
        }, 10000)
        setToastIndex(toastIndex+1)
    };

    const removeToast = (index) => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
    };

    const removeToastById = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }

    return {
        toasts,
        addToast,
        removeToast
    };
}