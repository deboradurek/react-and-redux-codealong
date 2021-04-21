function createStore() {
  // The store should have four parts:
  // 1. The state.
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state.

  // 1 State
  let state;

  // 2 Get
  const getState = () => state;

  return getState;
}
