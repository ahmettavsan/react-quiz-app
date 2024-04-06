import Option from "./components/Option";

export default function Question({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Option question={question} />
      </div>
    </div>
  );
}
