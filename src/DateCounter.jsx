import { useReducer } from "react";

// useReducer hooks needs reducer :
// function  containing all logic to update state.
// Decouples  state logic from component

//reducer is a pure function (no side effects!).
//that takes current state  and action.
//and returns the next state(so updated state).
//State is immutable in react
//action object that describes  how to update state

//dispatch :function to trigger  state updates, by sending actions
//from event handlers to the REDUCER

const initialState = { count: 0, step: 1 };

//reducer function takes current state and action
function reducer(state, action) {
  // console.log("güncel state:", state, "action:", action);
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "defineCount":
      return { ...state, count: action.payload };
    case "defineStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("unknown action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  //when dispatch callback ,reducer function always run.
  //dispatch(2); -------->  reducer(currentState,2)
  //useReducer hook returs state and dispatch function that use for update the state.

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "defineCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "defineStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
