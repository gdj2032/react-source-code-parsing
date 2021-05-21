import React, { Component } from 'react'
import { ClassComponent, FunctionComponent } from './doc/4-index';
//import './index.scss'

class Main extends Component {

  state = {}

  render() {
    return (
      <div>
        <h1>main</h1>
        <ClassComponent/>

        <div>--------</div>

        <FunctionComponent/>
      </div>
    )
  }
}

export default Main;
