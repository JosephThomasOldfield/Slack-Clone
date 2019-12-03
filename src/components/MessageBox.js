import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Message from './Message'
export default class MessageBox extends Component {

    state = {
        'development': [],
        'general': [{ author: 'Jake', time: new Date(), text: 'Test Message' }],
        'lovelace': [],
        'random': [],
        'resources': []
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.textInput).addEventListener('keyup', key => {
            this.sendMessage.call(this, key.keyCode);
        })
    }

    componentWillUnmount() {
        ReactDOM.findDOMNode(this.textInput).removeEventListener('keyup', this.sendMessage);
    }

    sendMessage(key) {
        if (key === 13) {
            if (this.textInput.value.replace(/\s/g, '').length) {
                let messages = this.messageArray;
                messages.push({
                    author: this.props.username,
                    time: new Date(),
                    text: this.textInput.value
                })
                this.setState({
                    [this.curChannel]: messages
                });
                this.textInput.value = "";
                let messageBox = ReactDOM.findDOMNode(this.messageBox);
                messageBox.scrollTo(0, messageBox.scrollHeight);
            }
        }
    }

    render() {
        this.curChannel = this.props.app.state.channel;
        this.messageArray = this.state[this.curChannel]
        let messages = this.state[this.curChannel].map(message => {
            return <Message author={ message.author } time={ convertTimeToStamp(message.time) } text={ message.text }/>
        });
        return (
            <React.Fragment>
                <div ref = { el => this.messageBox = el } className="messageHolder">
                    { messages }
                </div>
                <div className="inputHolder">
                    <input ref={el => this.textInput = el} type="text" placeholder={"Message #" + this.curChannel }/>
                </div>
            </React.Fragment>
        )
    }
}

let convertTimeToStamp = (time) => {
    let hours = time.getHours();
    let minutes = ("0" + time.getMinutes()).slice(-2);
    return hours + ':' + minutes;
}