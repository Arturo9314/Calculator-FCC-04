import { useState } from 'react'
import './App.css'
import Display from './components/Display'
import Keypad from './components/Keypad'
import { evaluate, round } from 'mathjs'

function App() {
  
  const [display, setDisplay] = useState({
    expression: '',
    answer: ''
  });
  
  const clearAll = ()=>{
    setDisplay({
      expression: '',
      answer: ''
    });
  }

  const isOperator = (key)=>{
    return /[*/+-]/.test(key)
  }

  const isNumber = (key)=>{
    return /^[0-9]$/.test(key);
  }

  const thereIsADot = ()=>{
    const {expression} = display
    return expression.indexOf('.')>=0
  }

  const lastItem = (key)=>{
    return display.answer[display.answer.length-1] === key
  }

  const evaluated = ()=>{
    const {answer} = display
    return answer.indexOf('=')>=0
  }

  const addKey = (key)=>{
    const {expression, answer} = display;
    const emptyExpression = expression === ''
    const isExpressionEqualAnswer = expression===answer


    if(key==='AC'){
      clearAll()
    }else if(isNumber(key)){
      //Si expression esta vacia y es cero no poder empezar
      if(emptyExpression && key==='0'){
        return
      }else if(evaluated()){
        setDisplay({
          expression: key,
          answer: key
        })
      }else{
        setDisplay({
          expression: display.expression+key,
          answer: display.answer+key
        })
      }
    }else if(key==='.'){
      //Si expression esta vacia, llenar expression y answer con 0.
      if(emptyExpression){
        setDisplay({
          expression: '0.',
          answer: '0.'
        })
      }//Si la expresion ya tiene un punto, no permitir otro
      else if( evaluated() ){
        setDisplay({
          expression: key,
          answer: key
        })
      }else if(thereIsADot()){
        return
      }else{
        setDisplay({
          expression: display.expression+key,
          answer: display.answer+key
        })
      }
    }else if(isOperator(key)){
      //Si ultimo es operador no poder apretar
      if(lastItem(key)){
        return
      }else if( evaluated() ){
        setDisplay({
          expression: expression+key,
          answer: expression+key
        })
      }else{
        //Si no agregar expression a answer y limpiar expresion
        setDisplay({
          expression: key,
          answer: answer+key
        })
      }     
    }else if(key==='='){
      //Si expression y answer estan vacias, no poder apretar
      if(emptyExpression && isExpressionEqualAnswer){
        return
      }else{
        //Si no evaluar answer, mostrar en expresion y agregar en answer = result
        const filtered = answer.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');
        const result = round(evaluate(filtered), 6)
        setDisplay({
          expression: result,
          answer: answer+'='+result
        })
      }
    }else{
      return
    }
  }
  
  return (
    <main className='App calculator'>
      <Display expression={display.expression} answer={display.answer} />
      <Keypad onKeyClick={addKey}/>
      <footer>
        <p className='author'>Designed and Coded by Arturo Torres Flores</p>
      </footer>
    </main>
  )
}

export default App
