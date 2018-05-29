import React, { Component } from 'react';
import '../stylesheets/keyboard.css'

export class Keyboard extends Component {

  handleKeyClass(inputKeycode, keySymbol, width='', multi=false) {
    let str = 'keyboard__key ' + width + ' '
      const {keyCode, showStats, incorrect, correctLetter, remainingText, inputSelected, correctLetterCase, caps, incorrectArr} = this.props
      if (showStats !== true) {
        if (keyCode === inputKeycode && incorrect === true) {
          str += 'keyboard__highlightedKey '
        }
        if (correctLetter === keySymbol && multi === false && remainingText !== '') {
          str += 'keyboard__correctKey'
        } else if (keySymbol.includes(correctLetter) && multi === true  && remainingText !== '') {
          str += 'keyboard__correctKey'
        }
        if (inputSelected === 'num' && correctLetter === ' ' && keySymbol === 'Enter') {
          str += 'keyboard__correctKey'
        }
        if (correctLetterCase === 'uppercase' && (inputKeycode === 'ShiftLeft' || inputKeycode === 'ShiftRight') && caps === 'keyboard__key keyboard__width-threeQuarts') {
          str += 'keyboard__correctKey'
        }
        if (correctLetterCase === 'lowercase' && (inputKeycode === 'ShiftLeft' || inputKeycode === 'ShiftRight') && caps === 'keyboard__key keyboard__width-threeQuarts keyboard__capsOn') {
          str += 'keyboard__correctKey'
        }
      }

      if (keySymbol !== 'Enter' && keySymbol !== 'ShiftLeft' && keySymbol !== 'ShiftRight' && keySymbol !== 'Caps' && keySymbol !== 'Tab' && keySymbol !== 'Backspace')
      if ((incorrectArr.includes(keySymbol.toLowerCase()[0])
      || incorrectArr.includes(keySymbol.toLowerCase()[1]))
      && showStats === true) {
        str += 'keyboard__capsOn'
      }

      return str;
  }
  render() {
    const {keyboardScaler, caps} = this.props
    return (
      <div className="keyboard" style={{zoom: keyboardScaler}}>
        <div className={this.handleKeyClass(192, '`~', '', true)}>&#96;</div>
        <div className={this.handleKeyClass(49, '1!', '', true)}>1</div>
        <div className={this.handleKeyClass(50, '2@', '', true)}>2</div>
        <div className={this.handleKeyClass(51, '3#', '', true)}>3</div>
        <div className={this.handleKeyClass(52, '4$', '', true)}>4</div>
        <div className={this.handleKeyClass(53, '5%', '', true)}>5</div>
        <div className={this.handleKeyClass(54, '6^', '', true)}>6</div>
        <div className={this.handleKeyClass(55, '7&', '', true)}>7</div>
        <div className={this.handleKeyClass(56, '8*', '', true)}>8</div>
        <div className={this.handleKeyClass(57, '9(', '', true)}>9</div>
        <div className={this.handleKeyClass(48, '0)', '', true)}>0</div>
        <div className={this.handleKeyClass(189, '-_', '', true)}>-</div>
        <div className={this.handleKeyClass(187, '=+', '', true)}>=</div>
        <div className={this.handleKeyClass(8, 'Backspace', 'keyboard__width-plusHalf', false)}>&larr;</div>

        <div className={this.handleKeyClass(9, 'Tab', 'keyboard__width-plusHalf', false)}>tab</div>
        <div className={this.handleKeyClass(81, 'q')}>Q</div>
        <div className={this.handleKeyClass(87, 'w')}>W</div>
        <div className={this.handleKeyClass(69, 'e')}>E</div>
        <div className={this.handleKeyClass(82, 'r')}>R</div>
        <div className={this.handleKeyClass(84, 't')}>T</div>
        <div className={this.handleKeyClass(89, 'y')}>Y</div>
        <div className={this.handleKeyClass(85, 'u')}>U</div>
        <div className={this.handleKeyClass(73, 'i')}>I</div>
        <div className={this.handleKeyClass(79, 'o')}>O</div>
        <div className={this.handleKeyClass(80, 'p')}>P</div>
        <div className={this.handleKeyClass(219, '[{', '', true)}>[</div>
        <div className={this.handleKeyClass(221, ']}', '', true)}>]</div>
        <div className={this.handleKeyClass(220, '\\|', '', true)}>\</div>

        <div className={caps}>CAPS</div>
        <div className={this.handleKeyClass(65, 'a')}>A</div>
        <div className={this.handleKeyClass(83, 's')}>S</div>
        <div className={this.handleKeyClass(68, 'd')}>D</div>
        <div className={this.handleKeyClass(70, 'f')}>F</div>
        <div className={this.handleKeyClass(71, 'g')}>G</div>
        <div className={this.handleKeyClass(72, 'h')}>H</div>
        <div className={this.handleKeyClass(74, 'j')}>J</div>
        <div className={this.handleKeyClass(75, 'k')}>K</div>
        <div className={this.handleKeyClass(76, 'l')}>L</div>
        <div className={this.handleKeyClass(186, ';:', '', true)}>;</div>
        <div className={this.handleKeyClass(222, '\'"', '', true)}>&#96;</div>

        <div className={this.handleKeyClass(13, 'Enter', 'keyboard__width-threeQuarts')}>ENTER</div>

        <div className={this.handleKeyClass('ShiftLeft', '~!@#$%^&*()_+{}|:"<>?', 'keyboard__width-plusOne', true)}>SHIFT</div>
        <div className={this.handleKeyClass(90, 'z')}>Z</div>
        <div className={this.handleKeyClass(88, 'x')}>X</div>
        <div className={this.handleKeyClass(67, 'c')}>C</div>
        <div className={this.handleKeyClass(86, 'v')}>V</div>
        <div className={this.handleKeyClass(66, 'b')}>B</div>
        <div className={this.handleKeyClass(78, 'n')}>N</div>
        <div className={this.handleKeyClass(77, 'm')}>M</div>
        <div className={this.handleKeyClass(188, ',<', '', true)}>,</div>
        <div className={this.handleKeyClass(190, '.>', '', true)}>.</div>
        <div className={this.handleKeyClass(191, '/?', '', true)}>/</div>
        <div className={this.handleKeyClass('ShiftRight', '~!@#$%^&*()_+{}|:"<>?', 'keyboard__width-plusOne', true)}>SHIFT</div>
        <div className={this.handleKeyClass(32, ' ', 'keyboard__spacebar')}></div>
      </div>
    )
  }
}
