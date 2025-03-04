const store = configureStore({ reducer: counterReducer });

const exampleThunkFunction = (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  const stateBefore = getState();
  console.log(`Counter before: ${stateBefore.counter}`);
  dispatch(increment());
  const stateAfter = getState();
  console.log(`Counter after: ${stateAfter.counter}`);
};

store.dispatch(exampleThunkFunction);

//--------
const logAndAdd = (amount: number) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const stateBefore = getState();
    console.log(`Counter before: ${stateBefore.counter}`);
    dispatch(incrementByAmount(amount));
    const stateAfter = getState();
    console.log(`Counter after: ${stateAfter.counter}`);
  };
};

store.dispatch(logAndAdd(5));
