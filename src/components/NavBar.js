import React from 'react'
import SlackLogo from '../resources/slack.png'
import Channel from './Channel'
import Option from './Option'
import GreenDot from './GreenDot'

export default function NavBar(props) {
    let channelList = props.channels.map(channel => {
        return <Channel name = { channel } setChannel = { () => {
            props.setChannelFunc.call(this, channel)
        }}/>
    });
    return (
        <div className="navBars">
            <div className="verNav">
                <div className="topArea">
                    <ul>
                        <li><img id="logo" alt="logo" src={SlackLogo} /></li>
                        <li><GreenDot /></li>
                        <li id = "username">{props.username}</li>
                    </ul>
                </div>
                <div className="chanArea">
                    <ul>
                        <li className="title">Channels</li>
                        { channelList }
                        <li className="title">Direct message</li>
                        <li><GreenDot /> SlackBot</li>
                        <li><GreenDot /> {props.username} (You)</li>
                    </ul>
                </div>
            </div>
            <div className="navigation">
                <ul>
                    <li className="channel">#{props.channel}</li>
                    <Option option = "i" />
                    <Option option = "Settings" />
                    <Option option = "@" />
                </ul>
            </div>
        </div>
    )
}