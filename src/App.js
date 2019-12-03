import React, { Component } from 'react'
import {BrowserRouter, Switch, Route, useHistory} from 'react-router-dom'
import Login from './components/Login'
import Messages from './components/MessageBox'
import Nav from './components/NavBar'
import './Apps.scss';

export default class App extends Component {

  state = {
    username: null,
    channel: 'general',
    channels: [
      'development','general','lovelace','random','resources'
    ]
  } 

  setChannel = (newChannel) => {
    this.setState({
      channel: newChannel
    });
  }

  loggedIn = () => {
    if (this.state.username) {
      return true;
    }
    return false;
  }

  changeUsername = () => {
    let username = this.usernameInput.value;
    let password = this.passwordInput.value;
    if (password) {
      this.setState({
        username: username
      });
    }
  }

  loginPageInit = () =>  {
    if (window.location.pathname !== "/") {
      useHistory().push('/');
    }
  }
  
  messageEntered(author, channel, message) {
    channel.push({
      author: author,
      time: new Date(),
      text: message
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* Login route */}
          { !this.loggedIn() && <Route path = "/" render = { 
            () => 
              <Login 
                loginFunc = { this.changeUsername } 
                app = { this } 
                init = { this.loginPageInit } 
              />
          } /> }
          {/* App route */}
          { this.loggedIn() && <Route path = "/" render = {
            () => 
                <React.Fragment>
                  <Nav 
                    username = { this.state.username } 
                    channel = { this.state.channel } 
                    setChannelFunc = { this.setChannel } 
                    channels = { this.state.channels }
                  />
                  <Messages 
                    username = { this.state.username } 
                    addMessage = { this.messageEntered  } 
                    app = { this } 
                  />
                </React.Fragment>
          } /> }
        </Switch> 
      </BrowserRouter>
    )
  }
}