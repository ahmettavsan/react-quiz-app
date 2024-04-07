export default function Option({ dispatch, question, answer }) {
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          key={i}
          className={`btn btn-option  ${
            answer && i === answer ? "answer" : ""
          } ${
            answer ? (i === question.correctOption ? "correct" : "wrong") : ""
          }`}
          disabled={answer}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
