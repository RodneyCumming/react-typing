import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import '../stylesheets/screen.css'

export class Screen extends Component {

  setScrollPosition() {
    const elementNode = findDOMNode(this.refs.progressMarker);
    let containerNode = findDOMNode(this.refs.screenRef);

    var topPos = elementNode.offsetTop;
    containerNode.scrollTop = topPos-140;
  }

  render() {
    const {screenFade, inputSelected, completedText, inputText, remainingText} = this.props
    return (
      <div className="screen" >
        <div className={screenFade === true ? "screen__inner__wrapperFadeIn" : "screen__inner__wrapper"} ref="screenRef">
          <div className={(inputSelected === 'num') ? 'screen__inner__num' : ((inputSelected === 'sym') ? 'screen__inner__sym' : '')}>
            <span className="completedText">{completedText}</span>
            <span className={(inputSelected === 'sym')
              ?  "progressMarker progressMarkerSym"
              : (inputSelected === 'num')
              ? "progressMarker progressMarkerNum"
              : 'progressMarker'
            } ref="progRef"></span>
            <span ref="progressMarker" className="remainingText">{remainingText}</span>
          </div>
          <div className="progressMeter">{
              ((completedText.length/inputText.length) * 100).toFixed(0) + '%'
            }</div>
        </div>
      </div>
    )
  }
}
