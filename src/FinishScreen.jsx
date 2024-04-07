import { useQuiz } from "./contexts/QuizContext";

export default function Finish() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;

  if (percentage === 100) emoji = "🏅";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🎉";
  else emoji = "😣";

  return (
    <>
      <p className="result">
        <span> {emoji} </span> You score <strong> {points} </strong> of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}) %
      </p>
      <p className="highscore"> (Highscore : {highscore} points ) </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}
