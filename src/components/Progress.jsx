export default function Progress({
  answer,
  index,
  numQuestion,
  points,
  maxPossiblePoint,
}) {
  return (
    <header className="progress">
      <progress value={index + Number(answer)} max={numQuestion} />
      <p>
        Question <strong> {index + 1} </strong> / {numQuestion}
      </p>
      <p>
        <strong>{points} </strong> / {maxPossiblePoint}
      </p>
    </header>
  );
}
