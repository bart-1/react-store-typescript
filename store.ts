interface Store<T> {
  getState: () => void;
  setState: (state: T) => void;

  subscribe: (listener: (state: T) => typeof state) => void;
}
type NewStore =<T>(initialState: T)=>Store<T>

const createStore:NewStore = (initialState) => {
  let currentState = initialState;
  const listeners = new Set();

  return {
    getState: () => currentState,
    setState: (newState) => {
      currentState = newState;
      listeners.forEach((listener: <T>(state: T) => typeof state) =>
        listener(currentState)
      );
    },
    subscribe: (listener) => {
      console.log(listener);
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

const prevStore = {A: 0, B:0}

const store = createStore(prevStore);

export default store;
