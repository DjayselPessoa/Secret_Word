// css
import './App.css';
// hooks
import {useState,useCallback,useEffect} from 'react';
// dados
import {wordsList} from './data/words';
// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1,name:"start"},
  {id:2,name:"game"},
  {id:3,name:"end"},
]

const guessesQty = 3

function App() {
  const [gameStage,setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)

  const [pickedWord,setPickedWord] = useState("")
  const [pickedCategory,setPickedCategory] = useState("")
  const [letters,setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(guessesQty)
  const [score,setScore] = useState(0)
  
  const pickWordAndCategory = useCallback(()=>{
    // escolhendo categoria
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];

    // escolhendo palavra
    const word = words[category][Math.floor(Math.random()*words[category].length)]

    return {word,category}
  },[words])
  // start the game
  const startGame = useCallback(()=>{
    // reset
    clearLetterStates();
    // colentando palavra e categoria
    const {word,category} = pickWordAndCategory();
    // lista de letras da palavra
    let wordLetters =  word.split("");
    wordLetters = wordLetters.map((l)=> l.toLowerCase());

    // setar estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  },[pickWordAndCategory]);

  // processar as letras
  const verifyLetter = (letter)=>{
    const normalizedLetter = letter.toLowerCase();
    //checando
    if(guessedLetters.includes(normalizedLetter)||wrongLetters.includes(normalizedLetter)){
      return;
    }
    // restart game
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,normalizedLetter,
      ])
    }else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,normalizedLetter,
      ])
      setGuesses((actualGuesses)=>actualGuesses-1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // caso as tentativas acabem
  useEffect(()=>{
    if(guesses<=0){
      //resetar todos os estados
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  },[guesses])

  // verificar se há vitória
  useEffect(()=>{
    const uniqueLetters = [...new Set(letters)];
    if(guessedLetters.length===uniqueLetters.length){
      setScore((actualScore)=>actualScore+= 100)
      if(guesses<3){
        setGuesses((actualGuesses)=>actualGuesses+1)
      }
      startGame();
    }
  },[guessedLetters,letters,guesses,startGame])

  // reiniciar o jogo
  const retry = ()=>{
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name)
  }
  
  return (
    <div className="App">
      {gameStage==='start' && <StartScreen startGame={startGame}/>}
      {gameStage==='game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage==='end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
