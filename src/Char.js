//   displayText() {
//     let randBook = books.books[Math.floor(Math.random() * books.books.length)]
//     let output = randBook.split('').map((letter, index) =>
//       <span key={letter.id} letter={letter} className={this.state.progress}>
//       </span>
//     );
//     this.setState({
//       inputText: randBook,
//       inputTextContainer: output
//     })
//   }
//
//
// import React from 'react';
// import './App.css';
//
// class Char extends React.Component {
//   getClassNames() {
//     console.log('get class names')
//   }
//
//   render() {
//     console.log(this.props)
//     return (
//      <span className={this.props.className} key={this.props.key} onClick={() => this.getClassNames()}>
//       {this.props.letter}
//       </span>
//     );
//   }
// }
//
// export default Char
