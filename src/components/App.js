import React, { Component } from 'react';
import books from '../data/text';
import words from '../data/text';
import '../stylesheets/small.css';
import { findDOMNode } from 'react-dom';

import {Header} from './Header'
import {Stats} from './Stats'
import {Screen} from './Screen'
import {Keyboard} from './Keyboard'
import {Sidebar} from './Sidebar'

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
      keyboardScaler: '100%',
      incorrectWordsArr: [],
      incorrectWordCurrent: false,
      screenFade: true,
      caps: 'keyboard__key keyboard__width-threeQuarts',
      showMenu: false
    }

    this.genFocus = this.genFocus.bind(this)
    this.genBlur = this.genBlur.bind(this)
    this.handleKeyboardScale = this.handleKeyboardScale.bind(this)
    this.handleToggleMenu = this.handleToggleMenu.bind(this)
    this.displayText = this.displayText.bind(this)
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
      for (var i = 1; i < 100; i++) {
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
      const genInputNode = findDOMNode(this.refs.sidebar.refs.genInput);

      contentText = "";
      for (let i = 1; i < 100; i++) {
        if (i % 5 === 0) {
          contentText += ' ';
        } else {
          contentText += genInputNode.value.charAt(Math.floor(Math.random() * genInputNode.value.length));
        }

      }
      genInputNode.blur();
      genInputNode.value = '';
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
      screenFade: false,
      showMenu: false
    })
    clearInterval(this.intervalId);
    setTimeout(() => this.refs.screen.setScrollPosition(), 0)

    let fadeTime = 1;
    (fromResults) ? fadeTime = 1000 : fadeTime = 1;

    setTimeout(() =>
    this.setState({
      screenFade: true
    }), fadeTime)
  }



  handleKeyPress(e) {
    // ignore tab, caps, shift, ctrl, backspace, enter
    if (e.key !== 'Tab' && e.key !== 'CapsLock' && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Backspance' && this.state.showStats === false & this.state.generatorFocus === false) {

      const {inputText, progress, completedText, remainingText, incorrectArr, timeIncreasing} = this.state

      if (progress === 0 && timeIncreasing === false) {
        this.intervalId  = setInterval(function() {
          const {currentCount, inputSelected} = this.state

          this.setState({
            currentCount: currentCount + 1,
          })

          if ((currentCount === 59 && inputSelected === 'test1')
              || (currentCount === 179 && inputSelected === 'test3')
              || (currentCount === 299 && inputSelected === 'test5')
        ) {
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
          this.refs.screen.setScrollPosition()
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
        caps: 'keyboard__key keyboard__width-threeQuarts keyboard__capsOn'
      })
    } else {
      this.setState({
        caps: 'keyboard__key keyboard__width-threeQuarts'
      })
    }
    if (this.state.generatorFocus === true && e.key === 'Enter' && findDOMNode(this.refs.sidebar.refs.genInput).value !== '') {
      this.displayText('gen')
    }
  }



  genFocus() {
    this.setState({
      generatorFocus: true
    })
  }
  genBlur() {
    this.setState({
      generatorFocus: false
    })
  }



  handleKeyboardScale() {
    let scaler = (Math.min(findDOMNode(this.refs.main).clientWidth/744, 1) * 100) + '%'
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
  }

  handleToggleMenu() {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }));
  }

  render() {
    const {accuracy, showStats, incorrectArr, wpm, currentCount, inputSelected, incorrectWordsArr, screenFade, completedText, inputText, remainingText, keyCode, incorrect, correctLetter, correctLetterCase, caps, keyboardScaler, showMenu} = this.state
    return (
      <div className="App">
        <Header handleToggleMenu = {this.handleToggleMenu}/>

        <div className="main" ref='main'>
          <Stats accuracy={accuracy} showStats={showStats} incorrectArr={incorrectArr} wpm={wpm} currentCount={currentCount} inputSelected={inputSelected} incorrectWordsArr={incorrectWordsArr} displayText = {this.displayText}/>

          <Screen screenFade={screenFade} inputSelected={inputSelected} completedText={completedText} inputText={inputText} remainingText={remainingText} ref='screen'/>

          <Keyboard keyCode={keyCode} showStats={showStats} incorrect={incorrect} correctLetter={correctLetter} remainingText={remainingText} inputSelected={inputSelected} correctLetterCase={correctLetterCase} caps={caps} incorrectArr={incorrectArr} keyboardScaler={keyboardScaler}/>
        </div>
        <Sidebar showMenu={showMenu} displayText={this.displayText} genBlur={this.genBlur} genFocus={this.genFocus} ref='sidebar'/>
    </div>
    );
  }
}

export default App;

/*
Todo List

---------Fuctionality--------------

---------Bugs--------------
prevent spacebar from scrolling

---------Styling--------------

---------Refactoring--------------
- less css animations
- better sample text

*/
