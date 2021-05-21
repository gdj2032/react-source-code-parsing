//值捕获
import React, { Component, useState } from 'react'

class ClassComponent extends Component {

  state = {
    num: 0,
  }

  onAdd = (e) => {
    setTimeout(() => {
      console.log('ClassComponent num: ', this.state.num);
    }, 3000);
    this.setState({ num: this.state.num + 1 })
  }

  render() {
    return (
      <div>
        <div>{this.state.num}</div>
        <button onClick={this.onAdd}>+</button>
      </div>
    )
  }
}

function FunctionComponent() {
  const [num, setNum] = useState(0);
  const onAdd = () => {
    setTimeout(() => {
      console.log('FunctionComponent num: ', num);
    }, 3000);
    setNum(num+1)
  }
  return (
    <div>
      <div>{num}</div>
      <button onClick={onAdd}>+</button>
    </div>
  )
}

export {
  ClassComponent,
  FunctionComponent,
};
