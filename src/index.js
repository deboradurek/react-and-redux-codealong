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

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Reducer Function 1
// Cases to update the internal state of our store
function todos(state = [], action) {
  // Listen to a specific event type
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

// Reducer Function 2
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

// Root Reducer
function app(state = {}, action) {
  return {
    // All reducers will be invoked: todos() and goals()
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

// Create instance of our store, passing a single reducer
const store = createStore(app);

// Listener for whenever the state changes
store.subscribe(() => console.log('The new state is: ', store.getState()));

// Update state with an action object
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  },
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  },
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  },
});

store.dispatch({
  type: REMOVE_TODO,
  id: 1,
});

store.dispatch({
  type: TOGGLE_TODO,
  id: 0,
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux',
  },
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds',
  },
});

store.dispatch({
  type: REMOVE_GOAL,
  id: 0,
});
