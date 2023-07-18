import "./words.css";
import { useEffect, useState } from "react";
import { getWords } from "../../apis/words";
function Words() {
  const [words, setWords] = useState([]);
  const answers = ["noun", "adjective", "verb", "adverb"];
  const fetchWords = async () => {
    const res = await getWords();
    setWords(res);
  };
  useEffect(() => {
    fetchWords();
  }, []);
  return (
    <div className="root">
      {words ? (
        words.map(word => (
          <div key={word.id}>
            {word.word}
            {answers.map(answer => (
              <p>{answer}</p>
            ))}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Words;
