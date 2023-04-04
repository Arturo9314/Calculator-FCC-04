import React from 'react'
import CalculatorBtn from './CalculatorBtn'
import calculatorKeys from '../elements/calculatorKeys'

export default function Keypad({onKeyClick}) {
  return (
    <section className='buttons'>
        {
          Object.keys(calculatorKeys).map((key)=>
            <CalculatorBtn onKeyClick={onKeyClick} key={key} id={key} value={calculatorKeys[key].value}/>
          )
        }
      </section>
  )
}
