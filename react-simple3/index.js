import React, { Component } from './react';
import ReactDOM from './react-dom';

// const ele = (
//   <div title='test' style='background: #ff0000;'>
//     <h3 className='title'>test react</h3>
//   </div>
// )

class User extends Component {
  render() {
    return (
      <div>111</div>
    )
  }
}

function Home() {
  return (
    <div title='test' style='background: #ff0000;'>
      <h3 className='title'>test react</h3>
      <User />
    </div>
  )
}

// console.log(<Home name='active' />);

ReactDOM.render(<Home name='active' />, document.querySelector('#root'));
