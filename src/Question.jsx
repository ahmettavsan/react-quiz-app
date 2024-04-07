import Option from "./components/Option";
import { useQuiz } from "./contexts/QuizContext";

export default function Question() {
  const { dispatch, question, answer } = useQuiz();
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Option question={question} answer={answer} dispatch={dispatch} />
      </div>
    </div>
  );
}
