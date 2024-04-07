import Option from "./components/Option";

export default function Question({ dispatch, question, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Option question={question} answer={answer} dispatch={dispatch} />
      </div>
    </div>
  );
}
