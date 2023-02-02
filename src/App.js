import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
// import Timer from './components/Timer'
// import { newGameStarted } from "./components/Timer";
function App() {
 

 //state which is storing the values of all the dice
 let [allDice, changeAllDice] = new React.useState(tenRandomNumber());

 let [tenzies, changeTenzies] = new React.useState(false)

//  let [held, changeHeld] = new React.useState(false)

 // This function is responsible for creating 10 random numbers for the dice component
 const [seconds, setSeconds] = React.useState(0);
 React.useEffect(() => {
   let intervalId
   if ( !tenzies){
      intervalId = setInterval(() => {
       setSeconds(seconds => seconds + 1);
     }, 1000);
   }
   
   return () => clearInterval(intervalId);
 }, [tenzies]);

  function tenRandomNumber() {
    let res = [];
    for (let i = 0; i < 10; i++) {
      let num = Math.floor(Math.random() * 6 + 1);
      res.push({ number: num, isHeld: false, id: nanoid() });
    }
    return res;
  }

  // Function to start a new game

  function newGame (){
    if (tenzies){
      changeAllDice(tenRandomNumber)
      changeTenzies(false)
      setSeconds(0)
    }
  }


  function aSingleDie() {
    let num = Math.floor(Math.random() * 6 + 1);
    return { number: num, isHeld: false, id: nanoid() };
  }

 

  React.useEffect(()=>{
     let allHeld = false, allSame = false;
     let firstDice = allDice[0].number;
     allHeld = allDice.every((dice)=>{
      return dice.isHeld
     })

     allSame = allDice.every((dice)=>{
      return dice.number === firstDice;
     })

     if (allHeld && allSame){
      console.log("You have won the game")
      changeTenzies(true)
     }
  }, [allDice,changeTenzies])

  function rollDice() {
    changeAllDice((oldDices) => {
      const newNumbers = oldDices.map((dice) => {
        return dice.isHeld?dice:aSingleDie();
      });
      return newNumbers;
    });
  }

  function changeIsHeld(id) {
    changeAllDice((oldVal) => {
      const newDices = oldVal.map((val) => {
        return val.id === id?{...val,isHeld:!val.isHeld}:val
      });
      return newDices;
    });
  }




  let diceComponents = allDice.map((num) => {
    return (
      <Die
        value={num.number}
        isHeld={num.isHeld}
        handleClick={() => changeIsHeld(num.id)}
        key={num.id}
      />
    );
  });

  return (
    <main>
      {/* <Confetti showIt = {tenzies}/> */}
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {/* <Timer tenzies = {tenzies} /> */}
      <p className="game-timer">Your time: {seconds}</p>
      <div className="die-container">{diceComponents}</div>
      <div className="roll-container">
        <button onClick={tenzies?newGame:rollDice} >{tenzies?'New Game':'Roll'}</button>
      </div>
    </main>
  );
}

export default App;
