import React, { Component } from './react';
import ReactDOM from './react-dom';

// const ele = (
//   <div title='test' style='background: #ff0000;'>
//     <h3 className='title'>test react</h3>
//   </div>
// )

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    }
  }

  componentWillMount() {
    console.log('将要加载 componentWillMount');
  }

  componentDidMount() {
    console.log('加载完成 componentDidMount');
  }

  componentReceiveProps(nextProps) {
    console.log('props 更新 componentReceiveProps', nextProps);
  }

  componentWillUpdate() {
    console.log('组件将要更新 componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('组件更新完成 componentDidUpdate');
  }

  componentWillUnMount() {
    console.log('组件卸载 componentWillUnMount');
  }

  handleButton = () => {
    this.setState({ num: this.state.num + 1 })
  }

  render() {
    return (
      <div title='user'>
        <h1>User</h1>
        <div>{this.state.num}</div>
        <button onClick={this.handleButton}>点我</button>
      </div>
    )
  }
}

function Home() {
  return (
    <div title='test' style='background: #ff000050;'>
      <h3 className='title'>test react</h3>
      <User />
    </div>
  )
}

// console.log(<Home name='active' />);

ReactDOM.render(<User name='active' />, document.querySelector('#root'));
