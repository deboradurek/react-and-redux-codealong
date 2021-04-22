/* Library Code */

function createStore(reducer) {
  // The store should have four parts:
  // 1. The state.
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state.

  // 1 State
  let state;
  let listeners = [];

  // 2 Get
  const getState = () => state;

  // 3 Listen
  const subscribe = (listener) => {
    // Push the function that is being passed to 'subscribe' when it is invoked
    listeners.push(listener);
    // Unsubscribe: filter out the original listener function that was passed in when 'subscribe' was invoked
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // 4 Update
  const dispatch = (action) => {
    // Get the new state
    state = reducer(state, action);
    // Invoke all listeners set up by the user
    listeners.forEach((listener) => listener());
  };

  return { getState, subscribe, dispatch };
}

/* App Code */

// Reducer Function
// Update internal state of our store
function todos(state = [], action) {
  // Listen to a specific event type
  if (action.type === 'ADD_TODO') {
    // Concatenate new todo item on to the state and returns new array
    return state.concat([action.todo]);
  }

  return state;
}

// Create instance of our store
const store = createStore(todos);

// Listener for whenever the state changes
store.subscribe(() => console.log('The new state is: ', store.getState()));

// Update state with an action object
store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false,
  },
});
