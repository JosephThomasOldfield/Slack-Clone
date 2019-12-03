import React from 'react'

export default function Message(message) {
    return (
            <div className = "message">
                <b>{ message.author }</b>: 
                <span>{message.time}</span>
                <p>{ message.text }</p>
            </div>
        );
}
