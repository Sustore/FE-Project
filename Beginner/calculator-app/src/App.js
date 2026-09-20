import {useState} from 'react';

import './App.css';

function App() {
  const firstRow = ['C', 'X', '.', '/'];
  const secondRow = ['1', '2', '3', '+'];
  const thirdRow = ['4', '5', '6', '-'];
  const fourthRow = ['7', '8', '9', '*'];
  const fifthRow = ['0', '+/-', '%', '='];

  const [operation, setOperation] = useState('');
  const [solution, setSolution] = useState('');
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [error, setError] = useState("");


  const finalize = (n1, n2, operand) => {
    let output = 0;
    let maxDecimalPlace = Math.max((n1.split('.')[1] || "").length, (n2.split('.')[1] || "").length);
    let num1 = Number(n1);
    let num2 = Number(n2);

    switch(operand){
      case '+':
        output = num1+num2;
        break;
      case '-':
        output = num1-num2;
        break;
      case '*':
        output = num1*num2;
        break;
      case '/':
        if(num2===0){
          throw new Error("Cannot divide by zero");
        }
        output = num1/num2;
        break;
      case '%':
        if(num2===0){
          throw new Error("Cannot modulo by zero");
        }
        output = num1%num2;
        break;
      default:
        break;
    }

    setOperand2(num2+"");
    if(maxDecimalPlace>0){
      output = output.toFixed(maxDecimalPlace);
    }
    return output;
  };

  const handleOperand = (value) => {
    if(solution){
      setOperand1(value);
      setOperand2('');
      setOperation('');
      setSolution('');
    }
    else if(!operation){
      setOperand1((prvOp1)=>prvOp1==="0" ? value : prvOp1+value);
    }
    else{
      setOperand2((prvOp2)=>prvOp2==="0" ? value : prvOp2+value);
    }
  }

  const manageDecimal = () => {
    if(solution){
      setSolution('');
      setOperand1('0.');
      setOperand2('');
      setOperation('');
    }
    else if(operation){
      if(operand2 && !operand2.includes('.')){
        setOperand2(prvOp2=>prvOp2+".");
      }
      else if(!operand2){
        setOperand2("0.");
      }
    }
    else{
      if(operand1 && !operand1.includes(".")){
        setOperand1(prvOp1=>prvOp1+".");
      }
      else if(!operand1){
        setOperand1('0.');
      }
    }
  }

  const handleSpecialCase = (value) => {
    switch(value){
      case '.':
        manageDecimal();
        break;
      case 'C':
        setOperand1('');
        setOperand2('');
        setOperation('');
        setSolution('');
        break;
      case 'X':
        if(solution){
          setSolution("");
          setOperand1(solution);
          setOperand2("");
          setOperation("");
        }
        else if(operand2){
          let updatedOp2 = operand2.slice(0,-1);
          if(updatedOp2==="-"){
            updatedOp2 = "0";
          }
          setOperand2(updatedOp2);
        }
        else if(operation){
          setOperation('');
        }
        else if(operand1){
          let updatedOp1 = operand1.slice(0,-1);
          if(updatedOp1==="-"){
            updatedOp1 = "0";
          }
          setOperand1(updatedOp1);
        }
        break;
      case '=':
        try{
        if(operand1 && operand2 && operation){
          let ans = finalize(solution || operand1, operand2, operation);
          if(solution){
            setOperand1(solution+"");
          }
          setSolution(ans+"");
        }
      }
        catch(err){
          setError(err.message);
        }
        break;
      case '+/-':
        if(solution){
          setOperand1(()=> solution.startsWith("-") ? solution.slice(1) : "-"+solution);
          setOperand2("");
          setOperation("");
          setSolution("");
        }
        else if(operand1==="0" || operand2==="0"){
          return;
        }
        else if(operand2){
          setOperand2((prvOp2)=> prvOp2.startsWith("-") ? prvOp2.slice(1) : "-"+prvOp2)
        }
        else if(operand1 && !operation){
          setOperand1((prvOp1)=> prvOp1.startsWith("-") ? prvOp1.slice(1) : "-"+prvOp1);
        }
        break;
      default:
        break;
    }
  }

  const calculate = (event) => {
    const val = event.target.value;
    if(error){
      setError("");
      setSolution("");
      setOperand1("");
      setOperand2("");
      setOperation("");
    }
    else if(['1','2','3','4','5','6','7','8','9','0'].includes(val)){
      handleOperand(val);
    }
    else if(['+','-','*','/', '%'].includes(val)){
      if(!operand1){
        return;
      }
      else if(solution){
        setOperand1(solution);
        setOperand2('');
        setOperation(val);
        setSolution('');
      }
      else if(operand1 && operand2){
        try{
        let ans = finalize(operand1, operand2, operation);
        setOperand2('');
        setOperand1(ans+"");
        setOperation(val);
        }
        catch(err){
          setError(err.message);
        }
      }
      else{
        setOperand1(prvOp1=>Number(prvOp1)+"");
        setOperation(val);
      }
    }
    else if([".","C","X","=","+/-"].includes(val)){
      handleSpecialCase(val);
    }
  }
  const currentValue = () => {
    if(error.length>0){
      return error;
    }
    else if(solution.length>0){
      return solution;
    }
    else if(operand2.length>0){
      return operand2;
    }
    else if(operand1.length>0){
      return operand1;
    }

    return 0;
  }
  return (
    <div className="App">
      <div className="screen" hasError={error}>
        <div className='equation'>{ operation && `${operand1} ${operation} ${operand2}`}{solution && ' ='}</div>
        <div className='current'>{currentValue()}</div>
      </div>
      <div className="calculation">
        <div className="firstRow">
          {
            firstRow.map((ele) => <button onClick={calculate} key={ele} value={ele}>{ele}</button>)
          }
        </div>
        <div className="secondRow">
          {
            secondRow.map((ele) => <button onClick={calculate} key={ele} value={ele}>{ele}</button>)
          }
        </div>
        <div className="thirdRow">
          {
            thirdRow.map((ele) => <button onClick={calculate} key={ele} value={ele}>{ele}</button>)
          }
        </div>
        <div className="fourthRow">
          {
            fourthRow.map((ele) => <button onClick={calculate} key={ele} value={ele}>{ele}</button>)
          }
        </div>
        <div className="fifthRow">
          {
            fifthRow.map((ele) => <button onClick={calculate} key={ele} value={ele}>{ele}</button>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
