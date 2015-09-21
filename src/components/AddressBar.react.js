import React from 'react';
import WebsocketStore from '../stores/WebsocketStore'
import WebsocketActions from '../actions/WebsocketActions'
import styles from '../assets/styles/components/addressBar.css'
import buttonStyle from '../assets/styles/components/button.css'

var AddressBar = React.createClass({
  getInitialState() {
    var websocket = WebsocketStore.getState();
    return {
      address: 'ws://demo.gugud.com:5721/websocket',
      websocket: websocket
    };
  },

  componentDidMount() {
    WebsocketStore.listen(this._onChange);
    WebsocketActions.initWebsocket();
  },

  componentWillUnmount() {
    WebsocketStore.unlisten(this._onChange);
  },

  _onChange(state) {
    this.setState({
      websocket: state
    });
  },

  _onClick() {
    if (this.state.websocket.connected) {
      WebsocketActions.closeWebsocket();
    } else {
      WebsocketActions.openWebsocket(this.state.address);
    }
  },

  _onAddressChange(event) {
    this.setState({
      address: event.target.value
    })
  },

  render() {
    var text = this.state.websocket.connected ? 'Disconnect' : 'Connect';
    return (
      <div className={styles.root}>
        <input className={styles.input} type="text" placeholder="Websocket address" value={this.state.address} onChange={this._onAddressChange} />
        <button className={buttonStyle.button} type="button" onClick={this._onClick}>{text}</button>
      </div>
    );
  }
});

export default AddressBar;
