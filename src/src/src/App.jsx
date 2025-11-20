import React, { useState, useEffect } from 'react';
import { Trophy, Star, Brain, Book, Target, Award, RotateCcw, Home } from 'lucide-react';

const PashaMaster = () => {
  const [screen, setScreen] = useState('home');
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const quizData = {
    vocabulary: {
      easy: [
        { q: "What is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
        { q: "What does 'enormous' mean?", options: ["Tiny", "Very large", "Medium", "Small"], correct: 1 },
        { q: "What is the opposite of 'hot'?", options: ["Cold", "Warm", "Cool", "Freezing"], correct: 0 },
        { q: "What does 'ancient' mean?", options: ["New", "Modern", "Very old", "Recent"], correct: 2 },
        { q: "What is a synonym for 'quick'?", options: ["Slow", "Fast", "Lazy", "Tired"], correct: 1 }
      ],
      medium: [
        { q: "What does 'meticulous' mean?", options: ["Careless", "Very careful", "Quick", "Lazy"], correct: 1 },
        { q: "What is a synonym for 'ubiquitous'?", options: ["Rare", "Everywhere", "Hidden", "Lost"], correct: 1 },
        { q: "What does 'ephemeral' mean?", options: ["Permanent", "Short-lived", "Ancient", "Modern"], correct: 1 },
        { q: "What is the meaning of 'benevolent'?", options: ["Evil", "Kind", "Angry", "Sad"], correct: 1 },
        { q: "What does 'eloquent' mean?", options: ["Silent", "Fluent in speaking", "Rude", "Shy"], correct: 1 }
      ],
      hard: [
        { q: "What does 'pusillanimous' mean?", options: ["Brave", "Cowardly", "Strong", "Weak"], correct: 1 },
        { q: "What is a synonym for 'obfuscate'?", options: ["Clarify", "Confuse", "Explain", "Simplify"], correct: 1 },
        { q: "What does 'sesquipedalian' mean?", options: ["Short words", "Long words", "No words", "Few words"], correct: 1 },
        { q: "What is the meaning of 'perspicacious'?", options: ["Stupid", "Having insight", "Blind", "Deaf"], correct: 1 },
        { q: "What does 'obsequious' mean?", options: ["Rude", "Overly obedient", "Proud", "Independent"], correct: 1 }
      ]
    },
    grammar: {
      easy: [
        { q: "Which is correct?", options: ["He don't like it", "He doesn't like it", "He not like it", "He no like it"], correct: 1 },
        { q: "Choose the correct form:", options: ["I am going", "I is going", "I are going", "I be going"], correct: 0 },
        { q: "Which is correct?", options: ["She go to school", "She goes to school", "She going to school", "She gone to school"], correct: 1 },
        { q: "Select the right option:", options: ["They was happy", "They were happy", "They is happy", "They be happy"], correct: 1 },
        { q: "Which is correct?", options: ["I has a book", "I have a book", "I having a book", "I haves a book"], correct: 1 }
      ],
      medium: [
        { q: "Which sentence uses the correct tense?", options: ["I have went there", "I have gone there", "I has gone there", "I had went there"], correct: 1 },
        { q: "Choose the correct form:", options: ["If I was you", "If I were you", "If I am you", "If I be you"], correct: 1 },
        { q: "Which is correct?", options: ["Between you and I", "Between you and me", "Between you and myself", "Between I and you"], correct: 1 },
        { q: "Select the right option:", options: ["Who's book is this?", "Whose book is this?", "Who book is this?", "Whom book is this?"], correct: 1 },
        { q: "Which is correct?", options: ["She laid down", "She lay down", "She layed down", "She lies down"], correct: 1 }
      ],
      hard: [
        { q: "Which sentence is grammatically correct?", options: ["Had I known, I would have come", "If I would have known, I would have come", "Had I knew, I would come", "If I had knew, I would have come"], correct: 0 },
        { q: "Choose the correct form:", options: ["The data is conclusive", "The data are conclusive", "Both are correct", "Neither is correct"], correct: 2 },
        { q: "Which is correct?", options: ["I wish I was taller", "I wish I were taller", "I wish I am taller", "I wish I be taller"], correct: 1 },
        { q: "Select the right option:", options: ["Neither of them are here", "Neither of them is here", "Neither of them be here", "Neither of them was here"], correct: 1 },
        { q: "Which is correct?", options: ["The number of people are increasing", "The number of people is increasing", "The number of people were increasing", "The number of people have increasing"], correct: 1 }
      ]
    },
    idioms: {
      easy: [
        { q: "What does 'break a leg' mean?", options: ["Get injured", "Good luck", "Run fast", "Dance well"], correct: 1 },
        { q: "What does 'piece of cake' mean?", options: ["Dessert", "Very easy", "Very hard", "Food"], correct: 1 },
        { q: "What does 'under the weather' mean?", options: ["Outside", "Sick", "Happy", "Rainy"], correct: 1 },
        { q: "What does 'hit the hay' mean?", options: ["Farm work", "Go to sleep", "Fight", "Eat"], correct: 1 },
        { q: "What does 'spill the beans' mean?", options: ["Cook", "Reveal a secret", "Make a mess", "Eat"], correct: 1 }
      ],
      medium: [
        { q: "What does 'beat around the bush' mean?", options: ["Gardening", "Avoid the topic", "Be direct", "Fight"], correct: 1 },
        { q: "What does 'cost an arm and a leg' mean?", options: ["Be injured", "Very expensive", "Cheap", "Free"], correct: 1 },
        { q: "What does 'the ball is in your court' mean?", options: ["Play sports", "It's your decision", "You lost", "You won"], correct: 1 },
        { q: "What does 'let the cat out of the bag' mean?", options: ["Free a pet", "Reveal a secret", "Hide something", "Be angry"], correct: 1 },
        { q: "What does 'bite off more than you can chew' mean?", options: ["Eat too much", "Take on too much", "Be hungry", "Be careful"], correct: 1 }
      ],
      hard: [
        { q: "What does 'burn the midnight oil' mean?", options: ["Start a fire", "Work late", "Go to sleep", "Waste time"], correct: 1 },
        { q: "What does 'throw in the towel' mean?", options: ["Clean up", "Give up", "Start fresh", "Win"], correct: 1 },
        { q: "What does 'the devil is in the details' mean?", options: ["Evil exists", "Small things matter", "Be careful", "Don't worry"], correct: 1 },
        { q: "What does 'cut to the chase' mean?", options: ["Run away", "Get to the point", "Stop talking", "Start over"], correct: 1 },
        { q: "What does 'go the extra mile' mean?", options: ["Travel far", "Do more than expected", "Be lazy", "Give up"], correct: 1 }
      ]
    }
  };

  useEffect(() => {
    if (screen === 'quiz' && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1);
    }
  }, [timeLeft, screen, showResult]);

  const startQuiz = (cat, diff) => {
    setCategory(cat);
    setDifficulty(diff);
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setScreen('quiz');
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const questions = quizData[category][difficulty];
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    
    if (isCorrect) {
      const points = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
      const timeBonus = Math.floor(timeLeft / 3);
      setScore(score + points + timeBonus);
      setTotalScore(totalScore + points + timeBonus);
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) setBestStreak(streak + 1);
    } else {
      setLives(lives - 1);
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    const questions = quizData[category][difficulty];
    
    if (lives === 0) {
      setScreen('gameover');
      return;
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setScreen('complete');
    }
  };

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500 mr-2" />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Pasha Master
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Master English Through Fun Quizzes!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-xl text-center">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-800">{totalScore}</div>
            <div className="text-sm text-yellow-700">Total Score</div>
          </div>
          <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-xl text-center">
            <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-800">{bestStreak}</div>
            <div className="text-sm text-red-700">Best Streak</div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Choose Category</h2>
          
          <button onClick={() => setScreen('vocabulary')} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl transition flex items-center justify-between shadow-lg">
            <div className="flex items-center">
              <Book className="w-8 h-8 mr-3" />
              <div className="text-left">
                <div className="text-xl font-bold">Vocabulary</div>
                <div className="text-sm opacity-90">Test your word knowledge</div>
              </div>
            </div>
          </button>

          <button onClick={() => setScreen('grammar')} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-xl transition flex items-center justify-between shadow-lg">
            <div className="flex items-center">
              <Target className="w-8 h-8 mr-3" />
              <div className="text-left">
                <div className="text-xl font-bold">Grammar</div>
                <div className="text-sm opacity-90">Master English grammar rules</div>
              </div>
            </div>
          </button>

          <button onClick={() => setScreen('idioms')} className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl transition flex items-center justify-between shadow-lg">
            <div className="flex items-center">
              <Brain className="w-8 h-8 mr-3" />
              <div className="text-left">
                <div className="text-xl font-bold">Idioms & Phrases</div>
                <div className="text-sm opacity-90">Learn common expressions</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const DifficultyScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <button onClick={() => setScreen('home')} className="mb-6 flex items-center text-gray-600 hover:text-gray-800">
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </button>
        
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Choose Difficulty
        </h2>
        
        <div className="space-y-4">
          <button onClick={() => startQuiz(screen, 'easy')} className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white p-6 rounded-xl transition shadow-lg">
            <div className="text-2xl font-bold mb-1">Easy</div>
            <div className="text-sm opacity-90">10 points per question</div>
          </button>

          <button onClick={() => startQuiz(screen, 'medium')} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white p-6 rounded-xl transition shadow-lg">
            <div className="text-2xl font-bold mb-1">Medium</div>
            <div className="text-sm opacity-90">20 points per question</div>
          </button>

          <button onClick={() => startQuiz(screen, 'hard')} className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-6 rounded-xl transition shadow-lg">
            <div className="text-2xl font-bold mb-1">Hard</div>
            <div className="text-sm opacity-90">30 points per question</div>
          </button>
        </div>
      </div>
    </div>
  );

  const QuizScreen = () => {
    const questions = quizData[category][difficulty];
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${i < lives ? 'bg-red-500' : 'bg-gray-300'} mr-1`}>
                    ❤️
                  </div>
                ))}
              </div>
              <div className="text-lg font-bold text-gray-700">Streak: {streak} 🔥</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-600'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all ${timeLeft <= 10 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.q}</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, index) => {
                let buttonClass = "w-full p-4 rounded-xl text-left transition font-semibold ";
                
                if (showResult) {
                  if (index === question.correct) {
                    buttonClass += "bg-green-500 text-white";
                  } else if (index === selectedAnswer) {
                    buttonClass += "bg-red-500 text-white";
                  } else {
                    buttonClass += "bg-gray-200 text-gray-600";
                  }
                } else {
                  buttonClass += "bg-gray-100 hover:bg-purple-100 text-gray-800";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {showResult && (
            <div className="text-center">
              <div className={`text-xl font-bold mb-4 ${selectedAnswer === question.correct ? 'text-green-600' : 'text-red-600'}`}>
                {selectedAnswer === question.correct ? '✓ Correct!' : '✗ Wrong!'}
              </div>
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold transition"
              >
                {currentQuestion + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CompleteScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
        <div className="text-6xl font-bold text-purple-600 mb-2">{score}</div>
        <div className="text-gray-600 mb-6">Final Score</div>
        
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <div className="text-sm text-gray-600 mb-2">Best Streak</div>
          <div className="text-3xl font-bold text-orange-500">{bestStreak} 🔥</div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => startQuiz(category, difficulty)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </button>
          <button
            onClick={() => setScreen('home')}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </button>
        </div>
      </div>
    </div>
  );

  const GameOverScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-6">💔</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Over!</h2>
        <div className="text-gray-600 mb-2">You ran out of lives</div>
        <div className="text-5xl font-bold text-red-600 mb-6">{score}</div>
        
        <div className="space-y-3">
          <button
            onClick={() => startQuiz(category, difficulty)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <button
            onClick={() => setScreen('home')}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {screen === 'home' && <HomeScreen />}
      {(screen === 'vocabulary' || screen === 'grammar' || screen === 'idioms') && <DifficultyScreen />}
      {screen === 'quiz' && <QuizScreen />}
      {screen === 'complete' && <CompleteScreen />}
      {screen === 'gameover' && <GameOverScreen />}
    </>
  );
};

export default PashaMaster;
