export default function StartScreen({
  numQuestions,
  dispatch,
  count,
  setCount,
}) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz </h2>
      <h3>{numQuestions} question to test your React mastery </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active" })}
      >
        Lets Start
      </button>
    </div>
  );
}