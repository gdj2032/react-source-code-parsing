import { renderComponent } from '../react-dom'

class Component {

  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }

  setState = (value) => {
    //对象拷贝
    Object.assign(this.state, value)
    //组件渲染
    renderComponent(this);
  }

}

export default Component;
