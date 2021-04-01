import './App.css';
import Keyboard from './calc/Keyboard.js'
import React from 'react'
import {evaluate} from 'mathjs'
import Toast from './Toast/Toast.js'
import Board from './calc/Board.js'

let expr = {
  str: "",
  strParse: "",
  result: "",
  //isCalc: true,
  set: function (value) {
    this.str += value;
  },
  clear: function () {
    this.str = "";
    this.result = "";
    this.strParse = "";
  },
  bs: function () {
    if (this.str.length) {
      this.str = this.str.slice(0, -1);
      //fixsed -> //добавить реакцию на изменеия в strPars, result
      if (this.str.length && !["/", "*", "-", "+", "."].includes(this.str[this.str.length - 1])) {
        this.result = this.str;
        //expr.isCalc = true;
      } else {
        this.result = "";
        //expr.isCalc = false;
      }
    }
  },
};

function App() {
  let [expression, setExpression] = React.useState("");
  let [result, setResult] = React.useState("");

  function btnClick(e) {
    const nambers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // проверка клика по img backspace
    if (e.target.localName === "img") e.target.value = "bs"; // привязка аналогичгного обработчика

    //связываем e.target.value с объектом expr
    let char = e.target.value;

    //проверка на:
    //    1 является ли значение первым в строке
    //    2 первый элемент должен быть числом либо знаком минус
    // в противном случае символ не учитывается и пждем следующего нажатия клавиш калк.
    if (expr.str.length === 0 && !nambers.includes(char) && char !== "-") {
      //Toast('Most be namber or -')

      //ДОБАВИТЬ ПРОВЕРКУ НА ТОЧКУ С ДОБАВЛЕНИЕМ ПЕРЕД НЕЙ НУЛЯ

      console.log(
        "Первым должено быть число или знак минус! Ожидание следуйщего символа..."
      );
      return false;
    }

    // если символ не перый в строке, либо число либо знак минус, то
    console.log("->   ...");
    switch (char) {
      case "AC":
        expr.clear();
        break;

      case "bs":
        expr.bs();
        break;

      case "=":
        if (expr.result.length) {
          expr.str = expr.result.toString();
          expr.result = "";
          console.log("result= " + evaluate(expression));
        }
        break;
      case "%":
        // добавить замену числа на число деленное на 100
        break;
      default:
        if (["/", "*", "-", "+", "."].includes(char)) {
          //expr.isCalc = false;
          expr.result = "";
          if (
            ["/", "*", "-", "+", "."].includes(expr.str[expr.str.length - 1])
          ) {
            expr.bs();
          }
          expr.set(char);
        } else {
          expr.set(char);
          //expr.isCalc = true;
          try {
            expr.result = evaluate(expr.str)
              .toFixed(8)
              .replace(/0*$/, "")
              .toString();
            if(expr.result[expr.result.length - 1] === '.'){
              expr.result = expr.result.slice(0, -1);
            }
            if (expr.result === "Infinity" || expr.result === "-Infinity")
              throw new Error("Результат недостежим");
          } catch (error) {
            expr.result = "";
            Toast("Недопустимое выражение");
            console.log(error);
          }
        }
    }
    setExpression(expr.str);
    setResult(expr.result); // most be evaluate(expr.strPars)
  }
  return (
    <div className="calc-app">
      <Board expression={expression} result={result} />
      <Keyboard onClick={btnClick} />
      <div id="toast"></div>
    </div>
  );
}

export default App;
