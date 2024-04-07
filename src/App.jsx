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
import { useQuiz } from "./contexts/QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Content>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
          </>
        )}
        <Footer>
          <NextButton />
        </Footer>
        {status === "finish" && <Finish />}
      </Content>
    </div>
  );
}
