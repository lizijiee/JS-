import React, { Component } from 'react';
import { version, Button,Icon } from 'antd';
import "antd/dist/antd.css";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div className="App">
      <p>Current antd version: {version}</p>
      <p>Please fork this codesandbox to reproduce your issue.</p>
      <p>请 fork 这个链接来重现你碰到的问题。</p>
      <Icon type="message" style={{ fontSize: '16px', color: '#08c' }} />

      <Button type="primary">Hello</Button>
    </div>
    );
  }
}

export default App;
