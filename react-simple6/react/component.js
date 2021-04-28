import { renderComponent } from '../react-dom'
import { enqueueSetState } from './set_state_queue'

class Component {

  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }

  setState = (value) => {
    // //对象拷贝
    // Object.assign(this.state, value)
    // //组件渲染
    // renderComponent(this);
    enqueueSetState(value, this)
  }

}

export default Component;
