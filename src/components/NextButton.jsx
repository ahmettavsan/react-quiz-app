export default function NextButton({ dispatch, index, numQuestions }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        if (index < numQuestions - 1) {
          dispatch({ type: "nextQuestion" });
        } else {
          dispatch({ type: "finish" });
        }
      }}
    >
      Next
    </button>
  );
}
