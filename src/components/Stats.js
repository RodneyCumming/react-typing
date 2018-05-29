import React, { Component } from 'react';
import FaRepeat from 'react-icons/lib/fa/repeat'
import FaStepForward from 'react-icons/lib/fa/step-forward'
import '../stylesheets/stats.css'

export class Stats extends Component {

  render() {
    const {showStats, accuracy, incorrectArr, wpm, currentCount, inputSelected, incorrectWordsArr, displayText} = this.props
    return (
      <div className={"stats " + (showStats === true ? 'statsCompleted': '')}>
        <div className={"resultsTitleHidden " + (showStats === true ? 'resultsTitleShow': '')}>Results</div>

          <div className="statbox">
            <p className ="statbox__title">Accuracy</p>
            <p className ="statbox__value">{accuracy}</p>
            <p className ="statbox__unit">%</p>
          </div>
          <div className="statbox">
            <p className ="statbox__title">Typos</p>
            <p className ="statbox__value">{incorrectArr.length}</p>
          </div>
          <div className="statbox">
            <p className ="statbox__title">Speed</p>
            <p className ="statbox__value">{wpm}</p>
            <p className ="statbox__unit">wpm</p>
          </div>
          <div className="statbox">
            <p className ="statbox__title">Time</p>
            <p className ="statbox__value">{currentCount}</p>
            <p className ="statbox__unit">sec</p>
          </div>

      <div className={"resultsOptionsHidden " + (showStats === true ? 'resultsOptionsShow': '')}>
        <div className="results__options__box"
          onClick={
            () => displayText('redoText', true)
          }>
          <FaRepeat/>
        </div>
        <div className={(inputSelected !== null)
          ? "results__options__box"
          : "results__options__boxUnavailable"}
          onClick={() => {
            if (inputSelected !== null) {
              displayText('nextText', true)
            }
          }
        }>
          <FaStepForward />
        </div>
        <div className={
            (incorrectArr.length === 0 && showStats === true)
            ? "results__options__boxUnavailable"
            : 'results__options__box'
          } onClick={() => {
            if (incorrectArr.length !== 0) {
              displayText('redoLetters', true)
            }
          }
          }>A</div>
        <div className={(incorrectArr.length > 0 && showStats === true && (inputSelected === 'text' || inputSelected === 'gen' || inputSelected === null))
          ? "results__options__box"
          : "results__options__boxUnavailable"}
          onClick={() => {
            if (incorrectWordsArr.length !== 0 && (inputSelected === 'text' || inputSelected === 'gen' || inputSelected === null)) {
              displayText('redoWords', true)
            }
          }
          }>ABC</div>
      </div>
    </div>
    )
  }
}
