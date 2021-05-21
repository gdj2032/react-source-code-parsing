import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './main';

const ele = (
  <div><h3 className='title'>test react</h3></div>
)

// const ele = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
//   className: "title"
// }, "hello react"));

// const ele = (
//   <div title='hello'>
//     <h3 className='title'>hello react</h3>
//   </div>
// )

// const ele = /*#__PURE__*/React.createElement("div", {
//   title: "hello"
// }, /*#__PURE__*/React.createElement("h3", {
//   className: "title"
// }, "hello react"));

const ele1 = (
  <div id='a1' key='a1'>
    <div id='b1' key='b1'></div>
    <div id='b2' key='b2'></div>
  </div>
)

const ele2 = React.createElement('div', { id: 'a1', key: 'a1' },
  React.createElement('div', { id: 'b1', key: 'b1' }),
  React.createElement('div', { id: 'b2', key: 'b2' })
)

console.log(ele1);
console.log(ele2);

ReactDOM.render(<Main />, document.getElementById('root'));
