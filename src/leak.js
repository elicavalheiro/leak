import { h } from 'snabbdom';

const createElement = (type, props = {}, ...children) => {
  if(type.prototype && type.prototype.isLeakClassComponent) {
    const componentInstance = new type(props);

    componentInstance.__vNode = componentInstance.render();

    componentInstance.__vNode.data.hook = {
      create: () => {
        componentInstance.componentDidMount()
      }
    }

    return componentInstance.__vNode
  }

  if(typeof(type) === 'function') return type(props);

  props = props || {};
  let dataProps = {};
  let eventProps = {};

  for(let propKey in props) {
    if(propKey.startsWith('on')) {
      const event = propKey.substring(2).toLowerCase();
      eventProps[event] = props[propKey];
    } else {
      dataProps[propKey] = props[propKey]
    }
  }

  return h(type, { props: dataProps, on: eventProps }, children);
};

class Component {
  constructor () {}

  componentDidMount () {}

  setState(partialState) {
    this.state = {
      ...this.state,
      ...this.partialState
    }

    Leak.__updater(this);
  }
  
  render() {}
}

Component.prototype.isLeakClassComponent = true;

const Leak = {
  createElement,
  Component
}

export default Leak;