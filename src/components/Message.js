export default function Message({msg, prevMsg}) {
    var shouldContinue = false
    const date = new Date(msg.date)
    if (prevMsg) {
        const prevDate = new Date(msg.date)
        if (prevMsg.owner.id == msg.owner.id 
            && formatDate(prevDate) == formatDate(date)) {
            shouldContinue = true
        }
    }
    

    // Function to format the Date object to "HH:MM"
    function formatTime(date) {
        const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with leading zero
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero
        return `${hours}:${minutes}`; // Return formatted time
    }

    // Function to format the Date object to "DD Month YYYY"
    function formatDate(date) {
        const days = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = months[date.getMonth()]; // Get month name
        const year = date.getFullYear(); // Get full year

        return `${days} ${month} ${year}`; // Return formatted date
    }

    return (
        <div style={{
            textAlign: "left"
        }}>
            {!shouldContinue &&
            <div style={{
                marginBottom: "-0.25rem",
                marginTop: "0.5rem"
            }}>
                <span className="label is-inline">{msg.owner?.name}</span>
                <span> </span>
                <span className="help is-inline"
                    style={{
                        opacity: 0.6
                    }}
                >
                {formatDate(date)}
                </span>
            </div>
            }
            <div style={{
                display: "flex"
            }}>
                <span className="help is-inline"
                    style={{
                        opacity: 0.6,
                        marginRight: "0.25rem"
                    }}
                >
                {formatTime(date)}
                </span>
                <span>{msg.message}</span>
            </div>
        </div>
    );
}