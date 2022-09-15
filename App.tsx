import * as React from 'react';
import store from './store';
import './style.css';

const useStore = (selector = (state) => state) => {
  const [state, setState] = React.useState(selector(store.getState()));
  React.useEffect(() => {
    store.subscribe((state) => setState(selector(state)));
  }, []);
  return state;
};

interface Item {
  item: string
}

const Display = ({ item }:Item) => (
  <div>
    {item}: {useStore((state) => state[item])}
  </div>
);

const Increment = ({ item }:Item) => {
  console.log(store.getState()[item])
  return (
    <button
      onClick={() => {
        const state = store.getState();
        store.setState({
          ...state,
          [item]: state[item] + 1,
        });
      }}
    >
      Increment {item}
    </button>
  );
};

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>

     <div style={{display: "flex", gap:"40px" }}>
      <Increment item="A" />
        <Display item="A" />
      </div>
     <div style={{display: "flex", gap:"40px" }}>
      <Increment item="B" />
   <Display item="B" />
   </div>
    </div>
 
  );
}
