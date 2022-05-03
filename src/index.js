import Leak from './leak';
import LeakDom from './leak-dom';
import Counter from './components/counter';

const Test = ({ isWorking }) => (<p>{isWorking}</p>)

const App = (
  <div>
    <h1>Leak</h1>
    <p>is it working?</p>
    <Test isWorking="true" />
    <Counter />
  </div>
);

LeakDom.render(App, document.getElementById('root'));