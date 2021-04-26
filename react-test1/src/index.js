import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ele = (
  <div>
    <h3 className='title'>test react</h3>
  </div>
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

ReactDOM.render(ele, document.getElementById('root'));
