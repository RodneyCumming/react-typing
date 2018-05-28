import React, { Component } from 'react';
import books from './text';
import words from './text';
import './App.css';
import ReactDOM from 'react-dom';
import FaRepeat from 'react-icons/lib/fa/repeat'
import FaStepForward from 'react-icons/lib/fa/step-forward'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: 'Welcome to typing practicer',
      keyPressed: null,
      keyCode: null,
      progress: 0,
      incorrectArr: [],
      remainingText: 'Welcome to typing practicer',
      completedText: '',
      accuracy: 100,
      incorrect: false,
      wordCount: 0,
      wpm: 0,
      currentCount: 0,
      intervalId: null,
      timeIncreasing: false,
      correctLetter: 'w',
      correctLetterCase: 'uppercase',
      inputSelected: null,
      showStats: false,
      generatorFocus: false,
      keyboardScaler: 1,
      incorrectWordsArr: [],
      incorrectWordCurrent: false,
      screenFade: true,
      caps: 'key width-threeQuarts',
    }

    this.genFocus = this.genFocus.bind(this)
    this.genBlur = this.genBlur.bind(this)
    this.handleKeyboardScale = this.handleKeyboardScale.bind(this)
  }




  componentDidMount() {

    document.addEventListener('keydown', (e) => {
      this.handleKeyPress(e)
    })

    window.addEventListener('resize', () => this.handleKeyboardScale())
    this.handleKeyboardScale()
  }

  displayText(inputType, fromResults=false) {
    let contentText = '';
    let possible = '';
    let nextText = false;

    if (inputType === 'nextText') {
      nextText = true;
      inputType = this.state.inputSelected;
    }
    console.log(this.state)

    // lesson bottons
    if (inputType === 'text') {
      contentText = books.books[Math.floor(Math.random() * books.books.length)]
    } else if (inputType === 'num' || inputType === 'sym' || inputType === 'redoLetters'){
        if (inputType === 'num') {
        contentText = "";
        possible = "0123456789";
      } else if (inputType === 'sym') {
        possible = "~!@#$%^&*()_-+={}[]|\\'\"<>:;,./?"
      } else if (inputType === 'redoLetters') {
        possible = this.state.incorrectArr.join('')
        inputType = this.state.inputSelected;
      }
      for (var i = 1; i < 10; i++) {
        (i % 5 === 0) ? contentText += ' ' : contentText += possible.charAt(Math.floor(Math.random() * possible.length))
      }
    } else if (inputType === 'redoText') {
      contentText = this.state.inputText;
      inputType = this.state.inputSelected;
    }

    while (nextText === true && contentText === this.state.inputText && inputType === 'text') {
      contentText = books.books[Math.floor(Math.random() * books.books.length)];
      nextText = false;
    }


    // text buttons
    if(inputType === 'test1' || inputType === 'test3' || inputType === 'test5') {

      function shuffle(a) {
          for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
      }
      shuffle(words.words)
      contentText = words.words.join(' ')
    }

    if (inputType === 'redoWords') {
      for (let i = 0; i < 19; i++) {
        contentText +=  this.state.incorrectWordsArr[Math.floor(Math.random() * this.state.incorrectWordsArr.length)] + ' '
      }
      contentText += this.state.incorrectWordsArr[Math.floor(Math.random() * this.state.incorrectWordsArr.length)]
    }

    // generator button
    if (inputType === 'gen') {
      const genInputNode = ReactDOM.findDOMNode(this.refs.genInput);
      contentText = "";
      for (let i = 1; i < 100; i++) {
        if (i % 5 === 0) {
          contentText += ' ';
        } else {
          contentText += genInputNode.value.charAt(Math.floor(Math.random() * genInputNode.value.length));
        }

      }
      ReactDOM.findDOMNode(this.refs.genBtn).blur();
    }

    this.setState({
      inputText: contentText,
      remainingText: contentText,
      completedText: '',
      progress: 0,
      incorrectArr: [],
      accuracy: 100,
      incorrect: false,
      currentCount: 0,
      wordCount: 0,
      wpm: 0,
      timeIncreasing: false,
      correctLetter: contentText.charAt(0).toLowerCase(),
      correctLetterCase: contentText.charAt(0) !== contentText.charAt(0).toLowerCase() ? 'uppercase' : 'lowercase',
      inputSelected: inputType,
      showStats: false,
      incorrectWordsArr: [],
      incorrectWordCurrent: false,
      screenFade: false
    })
    clearInterval(this.intervalId);
    setTimeout(() => this.setScrollPosition(), 0)

    let fadeTime = 1;
    (fromResults) ? fadeTime = 1000 : fadeTime = 1;
    console.log(fadeTime)

    setTimeout(() =>
    this.setState({
      screenFade: true
    }), fadeTime)
  }



  handleKeyPress(e) {
    console.log(e)
    // ignore tab, caps, shift, ctrl, backspace, enter
    if (e.key !== 'Tab' && e.key !== 'CapsLock' && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Backspance' && this.state.showStats === false & this.state.generatorFocus === false) {

      const {inputText, progress, completedText, remainingText, incorrectArr, wordCount, timeIncreasing} = this.state

      if (progress === 0 && timeIncreasing === false) {
        this.intervalId  = setInterval(function() {
          const {currentCount, inputSelected} = this.state

          this.setState({
            currentCount: currentCount + 1,
          })

          if (currentCount === 9 && inputSelected === 'test1') {
            clearInterval(this.intervalId);
            this.setState({
              showStats: true
            })
          }

        }.bind(this), 1000)
        this.setState({
          timeIncreasing: true
        })
      }

      const textLetter = inputText.charAt(progress)

      if (this.state.inputSelected === 'num') {
        this.setState({
          keyPressed: e.key === 'Shift' ? e.code : (e.key === 'Enter' ? ' ' : e.key),
          keyCode: e.keyCode,
        })
      } else {
        this.setState({
          keyPressed: e.key === 'Shift' ? e.code : e.key,
          keyCode: e.keyCode,
        })
      }


      const {keyPressed} = this.state

      //correct letter pressed
      if (keyPressed === textLetter) {
        // check correct Case
        this.setState({
          completedText: completedText + remainingText.charAt(0),
          remainingText: remainingText.slice(1),
          correctLetter: inputText.charAt(progress + 1).toLowerCase(),
          correctLetterCase: inputText.charAt(progress + 1) !== inputText.charAt(progress + 1).toLowerCase() ? 'uppercase' : 'lowercase',
          progress: progress + 1,
        })

        this.setState({
          accuracy: String((((this.state.completedText.length)/(this.state.completedText.length + this.state.incorrectArr.length)) * 100).toFixed(0)),
          incorrect: false
        })

        // word has been finished typed corretly
        if (inputText.charAt(progress + 1) === ' ') {
          this.handleWordEnd()
        }

        // scroll screen div

        if (keyPressed === ' ') {
          this.setScrollPosition()
        }

        // check for completed text
        if (this.state.remainingText === '' || this.state.remainingText === ' ') {
          clearInterval(this.intervalId);
          this.handleWordEnd();
          this.setState({
            showStats: true
          })


        }

      } else {
        console.log('false')
          this.setState({
            incorrectArr: [...incorrectArr, textLetter],
            incorrect: true,
            incorrectWordCurrent: true,
          })
        this.setState({
          accuracy: String((((this.state.completedText.length)/(this.state.completedText.length + this.state.incorrectArr.length)) * 100).toFixed(0))
        })
      }
    }
    if (e.getModifierState && e.getModifierState( 'CapsLock' )) {
      this.setState({
        caps: 'key width-threeQuarts capsOn'
      })
    } else {
      this.setState({
        caps: 'key width-threeQuarts'
      })
    }
  }

  handleKeyClass(inputKeycode, keySymbol, width='', multi=false) {
    let str = 'key ' + width + ' '
      if (this.state.keyCode === inputKeycode && this.state.incorrect === true) {
        str += 'highlightedKey '
      }
      if (this.state.correctLetter === keySymbol && multi === false && this.state.remainingText !== '') {
        str += 'correctKey'
      } else if (keySymbol.includes(this.state.correctLetter) && multi === true  && this.state.remainingText !== '') {
        str += 'correctKey'
      }
      if (this.state.inputSelected === 'num' && this.state.correctLetter === ' ' && keySymbol === 'Enter') {
        str += 'correctKey'
      }
      if (this.state.correctLetterCase === 'uppercase' && (inputKeycode === 'ShiftLeft' || inputKeycode === 'ShiftRight') && this.state.caps === 'key width-threeQuarts') {
        str += 'correctKey'
      }
      if (this.state.correctLetterCase === 'lowercase' && (inputKeycode === 'ShiftLeft' || inputKeycode === 'ShiftRight') && this.state.caps === 'key width-threeQuarts capsOn') {
        str += 'correctKey'
      }
      if (keySymbol !== 'Enter' && keySymbol !== 'ShiftLeft' && keySymbol !== 'ShiftRight' && keySymbol !== 'Caps' && keySymbol !== 'Tab')
      if ((this.state.incorrectArr.includes(keySymbol.toLowerCase()[0])
      || this.state.incorrectArr.includes(keySymbol.toLowerCase()[1]))
      && this.state.showStats === true) {
        str += 'capsOn'
      }

      return str;
  }

  changeClassOnKeyDown() {
    console.log('changeClassOnKeyDown')
  }

  genFocus() {
    console.log('focus')
    this.setState({
      generatorFocus: true
    })
  }
  genBlur() {
    console.log('focus')
    this.setState({
      generatorFocus: false
    })
  }

  setScrollPosition() {
    console.log('returned---')
    const elementNode = ReactDOM.findDOMNode(this.refs.progressMarker);
    let containerNode = ReactDOM.findDOMNode(this.refs.screenRef);

    var topPos = elementNode.offsetTop;
    containerNode.scrollTop = topPos-140;
  }

  handleKeyboardScale() {
    let scaler = (Math.min(ReactDOM.findDOMNode(this.refs.screenRef).clientWidth/744, 1) * 100) + '%'
    // // return {transform: `scale(${mainNode})`}
    console.log('width', scaler)
    this.setState({
      keyboardScaler: scaler
    })
  }

  handleWordEnd() {
    if (this.state.incorrectWordCurrent === true) {
      let misspeltWord =  this.state.completedText.split(" ").splice(-1)[0]
      this.setState(prevState => ({
        incorrectWordsArr: [...prevState.incorrectWordsArr, misspeltWord]
      }))
    }
    this.setState({
      wpm: (this.state.currentCount > 0) ? ((this.state.wordCount + 1)/(this.state.currentCount/60)).toFixed(0) : 0,
      wordCount: this.state.wordCount + 1,
      incorrectWordCurrent: false
    })
    console.log(this.state.incorrectWordsArr)
  }

  render() {
    const {remainingText, completedText, accuracy, incorrectArr, currentCount, wpm, inputSelected, showStats} = this.state
    return (
      <div className="App">
        <div className="header">
          <h1 className="header__title"><span className="bold-text">Typing</span> practicer</h1>
        </div>
        <div className="main" ref='main'>
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
              <div className="results__options__box" onClick={() => this.displayText('redoText', true)}><FaRepeat className='results__options__box__icon'/></div>
              <div className={(this.state.inputSelected !== null) ? "results__options__box" : "results__options__boxUnavailable"} onClick={() => {
                  if (this.state.inputSelected !== null) {
                    this.displayText('nextText', true)
                  }
                }
              }><FaStepForward /></div>
              <div className={
                  (this.state.incorrectArr.length === 0 && this.state.showStats === true)
                  ? "results__options__boxUnavailable"
                  : 'results__options__box'
                } onClick={() => {
                  if (this.state.incorrectArr.length !== 0) {
                    this.displayText('redoLetters', true)
                  }
                }
                }>A</div>
              <div className={(this.state.incorrectArr.length > 0 && this.state.showStats === true && (this.state.inputSelected === 'text' || this.state.inputSelected === 'gen' || this.state.inputSelected === null))
                ? "results__options__box"
                : "results__options__boxUnavailable"}
                onClick={() => {
                  if (this.state.incorrectWordsArr.length !== 0 && (this.state.inputSelected === 'text' || this.state.inputSelected === 'gen' || this.state.inputSelected === null)) {
                    this.displayText('redoWords', true)
                  }
                }
                }>ABC</div>
            </div>
          </div>
          <div className="screen" >
            <div className={this.state.screenFade === true ? "screen__inner__wrapperFadeIn" : "screen__inner__wrapper"} ref="screenRef">
              <div className={(inputSelected === 'num') ? 'screen__inner__num' : ((inputSelected === 'sym') ? 'screen__inner__sym' : '')}>
                <span className="completedText">{completedText}</span>
                <span className={(this.state.inputSelected === 'sym')
                  ?  "progressMarker progressMarkerSym"
                  : (this.state.inputSelected === 'num')
                  ? "progressMarker progressMarkerNum"
                  : 'progressMarker'
                } ref="progRef"></span>
                <span ref="progressMarker" className="remainingText">{remainingText}</span>
              </div>
            </div>
          </div>
          <div className="keyboard" style={{zoom: this.state.keyboardScaler}}>
            <div className={() => this.handleKeyClass(192, '`~', '', true)}>&#96;</div>
            <div className={() => this.handleKeyClass(49, '1!', '', true)}>1</div>
            <div className={() => this.handleKeyClass(50, '2@', '', true)}>2</div>
            <div className={() => this.handleKeyClass(51, '3#', '', true)}>3</div>
            <div className={() => this.handleKeyClass(52, '4$', '', true)}>4</div>
            <div className={() => this.handleKeyClass(53, '5%', '', true)}>5</div>
            <div className={() => this.handleKeyClass(54, '6^', '', true)}>6</div>
            <div className={() => this.handleKeyClass(55, '7&', '', true)}>7</div>
            <div className={() => this.handleKeyClass(56, '8*', '', true)}>8</div>
            <div className={() => this.handleKeyClass(57, '9(', '', true)}>9</div>
            <div className={() => this.handleKeyClass(48, '0)', '', true)}>0</div>
            <div className={this.handleKeyClass(189, '-_', '', true)}>-</div>
            <div className={this.handleKeyClass(187, '=+', '', true)}>=</div>
            <div className={this.handleKeyClass(8, 'Backspace', 'width-plusHalf', false)}>&larr;</div>

            <div className={this.handleKeyClass(9, 'Tab', 'width-plusHalf', false)}>tab</div>
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

            <div className={this.state.caps}>CAPS</div>
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

            <div className={this.handleKeyClass(13, 'Enter', 'width-threeQuarts')}>ENTER</div>

            <div className={this.handleKeyClass('ShiftLeft', '~!@#$%^&*()_+{}|:"<>?', 'width-plusOne', true)}>SHIFT</div>
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
            <div className={this.handleKeyClass('ShiftRight', '~!@#$%^&*()_+{}|:"<>?', 'width-plusOne', true)}>SHIFT</div>
            <div className={this.handleKeyClass(32, ' ', 'spacebar')}></div>
          </div>
        </div>
        <div className="rightside">
          <div className="sidebar">
            <div className="sidebar__box">
              <div className="sidebar__title">
                <h1 className="sidebar__tile__h1">Lessons</h1>
              </div>
              <div className="sidebar__item" onClick={() => this.displayText('text')}>
                <p className="sidebar__item__p">Text</p>
              </div>
              <div className="sidebar__item" onClick={() => this.displayText('num')}>
                <p className="sidebar__item__p">Numbers</p>
              </div>
              <div className="sidebar__item" onClick={() => this.displayText('sym')}>
                <p className="sidebar__item__p">Symbols</p>
              </div>
            </div>
            <div className="sidebar__box">
              <div className="sidebar__title">
                <h1 className="sidebar__tile__h1">Typing Test</h1>
              </div>
              <div className="sidebar__switch">
                <div className="sidebar__switch__option" onClick={() => this.displayText('test1')}>
                  <p>1min</p>
                </div>
                <div className="sidebar__switch__option" onClick={() => this.displayText('test3')}>
                  <p>3min</p>
                </div>
                <div className="sidebar__switch__option" onClick={() => this.displayText('test5')}>
                  <p>5min</p>
                </div>
              </div>
            </div>
            <div className="sidebar__box">
              <div className="sidebar__title">
                <h1 className="sidebar__tile__h1">Generator</h1>
              </div>
              <div className="sidebar__generator">
                 <input type="text" className="sidebar__generator__input" placeholder="add characters here" ref="genInput" onFocus={this.genFocus} onBlur={this.genBlur}/>
                 <button className="sidebar__generator__button" ref="genBtn" onClick={() => this.displayText('gen')}>+</button>
              </div>
            </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;

/*
Todo List

---------Fuctionality--------------
- progress bar for numbers (all)

---------Bugs--------------
functions alwasy running?

---------Styling--------------

---------Refactoring--------------
- classNames
- components
- speed optimisation

*/
