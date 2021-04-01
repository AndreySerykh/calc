import React from "react";

function Board(props) {
  return (
    <div className="calc-result">
      <span className="expression">{props.expression}</span>
      <span className="result">{props.result}</span>
    </div>
  );
}

export default Board;
