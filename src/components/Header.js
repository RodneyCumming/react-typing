import React, { Component } from 'react';
import FaBars from 'react-icons/lib/fa/bars'
import '../stylesheets/header.css';

export class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="header__title"><span className="header__boldText">Typing</span> practicer</h1>
        <div className="header__options" onClick={() => this.props.handleToggleMenu()}>
          <FaBars className="header__options__icon"/>
        </div>
      </div>
    )
  }
}
