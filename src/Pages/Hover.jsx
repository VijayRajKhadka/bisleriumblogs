import React, { Component } from 'react';
import Sidebar from './Sidebar';

export default class Hover extends Component {
  render() {
    return (
      <div>
        <div className="grid-container">
        <Sidebar/>
        </div>
      </div>
    );
  }
}
