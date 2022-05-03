import { init, propsModule, eventListenersModule }  from 'snabbdom';
import Leak from './leak';

const reconcile = init([propsModule, eventListenersModule]);

let rootVNode;

const render = (el, rootDomElement) => {
  if(rootVNode == null) {
    rootVNode = rootDomElement;
  }

  rootVNode = reconcile(rootVNode, el);
};

Leak.__updater = (componentInstance) => {
  const oldVNode = componentInstance.__vNode;
  const newVNode = componentInstance.render();
  
  componentInstance.__vNode = reconcile(oldVNode, newVNode);
}

const LeakDom = {
  render
}

export default LeakDom