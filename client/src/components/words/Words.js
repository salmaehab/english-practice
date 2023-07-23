import "./words.css";
import { useEffect, useState } from "react";
import { getWords } from "../../apis/words";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { useNavigate, Link } from "react-router-dom";
function Words() {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [disabledNext, setDisabledNext] = useState(true);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [index, setIndex] = useState(1);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const fetchWords = async () => {
    const res = await getWords();
    setWords(res);
  };
  useEffect(() => {
    fetchWords();
    setAnswers([
      { id: 1, answer: "noun" },
      { id: 2, answer: "adjective" },
      { id: 3, answer: "verb" },
      { id: 4, answer: "adverb" }
    ]);
  }, []);
  useEffect(() => {
    setFeedback("");
    setProgressPercentage(((index - 1) / 15) * 100);
  }, [index]);

  const current = words[index];
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    if (current) {
      if (selected === current.pos) {
        setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
      }
    }
  }, [selected, current]);
  const handleClick = answer => {
    setDisabledSubmit(false);
    setDisabledNext(false);
    setSelected(answer);
  };
  const handleSubmit = () => {
    if (selected === "") {
      setDisabledSubmit(true);
    }
    if (selected === current.pos) {
      setFeedback("Correct Answer!");
    } else if (selected !== current.pos) {
      setFeedback("Not quite right");
    }
    setDisabledSubmit(true);
    setSelected("");
  };

  const handleNext = () => {
    setDisabledSubmit(true);
    if (selected === "") {
      setDisabledNext(true);
      setDisabledSubmit(true);
    }

    if (index == 14) {
      navigate("/rank", { state: { count: numberOfCorrectAnswers } });
    } else {
      setIndex(index + 1);
      setSelected("");
      setDisabledNext(true);
    }
  };

  return (
    <div className="root">
      {current ? (
        <div key={current.id}>
          {current.word}
          <div className="answers">
            {answers.map(answer => (
              <p
                key={answer.id}
                className={
                  selected !== answer.answer ? "answer" : "selected-answer"
                }
                onClick={() => handleClick(answer.answer)}
              >
                {answer.answer}
              </p>
            ))}
          </div>
          <div className="buttons">
            <button
              className="btn"
              disabled={disabledSubmit}
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="btn"
              disabled={disabledNext}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
          <p>{feedback}</p>
          <div className="progress-bar-wrapper">
            <div className="progress-bar">
              <p>Number of answered questions:</p>
              <Progress percent={Math.ceil(progressPercentage)} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Words;
