import { useState , useEffect} from "react";
import Results from './Result'
const quizData = [
  {
    question: "Trong JavaScript, phương thức nào dùng để chuyển chuỗi thành số?",
    options: ["parseInt()", "toString()", "split()", "join()"],
    answer: "parseInt()"
  },
  {
    question: "Hook nào trong React dùng để xử lý side effects?",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    answer: "useEffect"
  },
  {
    question: "Từ khóa nào dùng để khai báo hằng số trong JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const"
  },
  {
    question: "Phương thức nào dùng để lọc phần tử trong mảng?",
    options: ["map()", "reduce()", "filter()", "findIndex()"],
    answer: "filter()"
  },
  {
    question: "Trong React, props được dùng để làm gì?",
    options: [
      "Quản lý state nội bộ",
      "Truyền dữ liệu giữa các component",
      "Tạo style",
      "Gọi API"
    ],
    answer: "Truyền dữ liệu giữa các component"
  },
  {
    question: "Thẻ HTML nào dùng để tạo danh sách không thứ tự?",
    options: ["<ol>", "<ul>", "<li>", "<table>"],
    answer: "<ul>"
  },
  {
    question: "Kết quả của 2 + '2' trong JavaScript là gì?",
    options: ["4", "22", "NaN", "undefined"],
    answer: "22"
  },
  {
    question: "Phương thức nào dùng để thêm phần tử vào đầu mảng?",
    options: ["push()", "unshift()", "shift()", "pop()"],
    answer: "unshift()"
  },
  {
    question: "Trong React, mỗi phần tử khi render danh sách cần có thuộc tính gì?",
    options: ["id", "name", "key", "class"],
    answer: "key"
  },
  {
    question: "CSS viết tắt của cụm từ nào?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  }
];

const Quiz = () => {
  const [optionSelected, setOptionSelected] = useState("");

  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: quizData.length })
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isQuizEnded, setIsQuizEnded] = useState(false);

  const [score, setScore] = useState(0);  

  const handleSelectedOption = (option, index) => {
    // tính điểm
    if (option === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    setOptionSelected(option);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = index;
    setUserAnswers(newUserAnswers);
  };

  const goNext = () => {
    if (currentQuestion === quizData.length - 1) {
      setIsQuizEnded(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
    setOptionSelected("");
    setScore(0);
    setUserAnswers(Array.from({ length: quizData.length }));
  };

  const rewatchQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
  };

  useEffect(() => {
    const answer = Number(userAnswers[currentQuestion]);
    const pastOptionSelected = quizData[currentQuestion].options[answer];

    if (answer !== undefined) {
      setOptionSelected(pastOptionSelected);
    } else {
      setOptionSelected("");
    }
  }, [currentQuestion, userAnswers]);

  // useEffect(() => {
  //   if (optionSelected === quizData[currentQuestion].answer) {
  //     setScore((prev) => prev + 1);
  //   }
  // }, [optionSelected]);

  if (isQuizEnded) {
    return (
      <Results
        score={score}
        totalQuestionNum={quizData.length}
        restartQuiz={restartQuiz}
        rewatchQuiz={rewatchQuiz}
      />
    );
  }

  return (
    <div>
      <h2>Câu {currentQuestion + 1}</h2>
      <p className="question">{quizData[currentQuestion].question}</p>

      {quizData[currentQuestion].options.map((option, index) => (
        <button
          key={option}
          className={`option ${optionSelected === option ? "selected" : ""}`}
          disabled={!!optionSelected && optionSelected !== option}
          onClick={() => handleSelectedOption(option, index)}
        >
          {option}
        </button>
      ))}

      {optionSelected ? (
        optionSelected === quizData[currentQuestion].answer ? (
          <p className="correct-answer">Câu trả lời của bạn chính xác</p>
        ) : (
          <p className="incorrect-answer">Câu trả lời của bạn chưa chính xác</p>
        )
      ) : (
        ""
      )}

      <div className="nav-buttons">
        <button
          onClick={goBack}
          disabled={currentQuestion === 0}
        >
          Quay Lại
        </button>
        <button
          onClick={goNext}
          disabled={!optionSelected}
        >
          {currentQuestion === quizData.length - 1 ? "Hoàn Thành Quiz" : "Kế Tiếp"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;