import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Logo from '../resources/slack.png'

export default class Login extends Component {

    constructor(props) {
        super();
        this.props = props;
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener('keyup', key => this.enterPressed.call(this, key.keyCode, this.props.loginFunc));
    }

    componentWillUnmount() {
        ReactDOM.findDOMNode(this).removeEventListener('keyup', this.enterPressed);
    }

    enterPressed (key, login) {
        if (key === 13) {
            login();
        }
    }

    render() {
        return (
            <div className = "login">
                <h1>Slack Clone</h1>
                <img src={Logo} alt="logo"></img><br/>
                <input ref={ el => this.props.app.usernameInput = el } type="text" placeholder="Username"/><br/>
                <input ref={ el => this.props.app.passwordInput = el } type="password" placeholder="Password"/><br/>
                <button 
                    ref={ el => this.props.app.loginBtn = el } 
                    onClick={this.props.loginFunc }
                >Login</button>
            </div>
        )
    }
}
