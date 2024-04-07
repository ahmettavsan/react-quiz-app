import { useEffect, useReducer } from "react";
import Header from "./Header";
import Error from "./Error";
import Loader from "./Loader";
import Content from "./Content";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finish from "./FinishScreen";

import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    case "restart":
      return {
        ...initialState,
        question: state.questions,
        status: "ready",
      };

    default:
      throw new Error("Unknown action!");
  }
}
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoint = questions.reduce((acc, cur) => acc + cur.points, 0);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((result) => dispatch({ type: "dataReceived", payload: result }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Content>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestions}
              maxPossiblePoint={maxPossiblePoint}
              answer={answer}
              points={points}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
          </>
        )}
        <Footer>
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          {answer && status !== "finish" && (
            <NextButton
              dispatch={dispatch}
              index={index}
              numQuestions={numQuestions}
            />
          )}
        </Footer>
        {status === "finish" && (
          <Finish
            points={points}
            maxPossiblePoints={maxPossiblePoint}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Content>
    </div>
  );
}
