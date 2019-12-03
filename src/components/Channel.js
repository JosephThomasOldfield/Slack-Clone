import React from 'react'

export default function Channel(props) {
    return (
        <li onClick = { props.setChannel }><b>#</b> { props.name }</li>
    )
}
