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

function createStore() {
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

  return { getState, subscribe };
}

// Get back the store
const store = createStore();
