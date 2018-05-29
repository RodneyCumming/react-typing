import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import '../stylesheets/sidebar.css'

export class Sidebar extends Component {


  render() {
    const {showMenu, displayText, genFocus, genBlur} = this.props
    return (
      <div className={showMenu ? "rightsideShow" : 'rightside'}>
        <div className="sidebar">
          <div className="sidebar__box">
            <div className="sidebar__title">
              <h1 className="sidebar__tile__h1">Lessons</h1>
            </div>
            <div className="sidebar__item" onClick={() => displayText('text')}>
              <p className="sidebar__item__p">Text</p>
            </div>
            <div className="sidebar__item" onClick={() => displayText('num')}>
              <p className="sidebar__item__p">Numbers</p>
            </div>
            <div className="sidebar__item" onClick={() => displayText('sym')}>
              <p className="sidebar__item__p">Symbols</p>
            </div>
          </div>
          <div className="sidebar__box">
            <div className="sidebar__title">
              <h1 className="sidebar__tile__h1">Typing Test</h1>
            </div>
            <div className="sidebar__switch">
              <div className="sidebar__switch__option" onClick={() => displayText('test1')}>
                <p>1min</p>
              </div>
              <div className="sidebar__switch__option" onClick={() => displayText('test3')}>
                <p>3min</p>
              </div>
              <div className="sidebar__switch__option" onClick={() => displayText('test5')}>
                <p>5min</p>
              </div>
            </div>
          </div>
          <div className="sidebar__box">
            <div className="sidebar__title">
              <h1 className="sidebar__tile__h1">Generator</h1>
            </div>
            <div className="sidebar__generator">
               <input type="text" className="sidebar__generator__input" placeholder="add characters here" ref="genInput" onFocus={genFocus} onBlur={genBlur}/>
               <button className="sidebar__generator__button" ref="genBtn" onClick={() =>
                   findDOMNode(this.refs.genInput).value !== '' ? displayText('gen') : ''}>+</button>
            </div>
          </div>
            </div>
      </div>
    )
  }
}
